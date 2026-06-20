import { getDailyGitLog } from './git';
import { appendToSheet } from './sheets';
import dotenv from 'dotenv';

// Mengambil variabel dari .env
dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function main() {
  if (!SPREADSHEET_ID) {
    console.error('Error: SPREADSHEET_ID tidak ditemukan di file .env');
    process.exit(1);
  }

  console.log('Mulai memproses Git Log...');

  try {
    const commits = await getDailyGitLog();

    if (commits.length === 0) {
      console.log('Tidak ada commit baru hari ini.');
      return;
    }

    console.log(`Ditemukan ${commits.length} commit hari ini. Menyiapkan data...`);

    // Mapping data objek menjadi array of array sesuai format kolom:
    // [Commit SHA, Tanggal (Date), Hari (Day), Pesan (Message)]
    const rows = commits.map(commit => [
      commit.sha,
      commit.date,
      commit.day,
      commit.message
    ]);

    // Opsi: Tambahkan Header jika diperlukan (bisa dihapus kalau tabelnya sudah punya header)
    // rows.unshift(['Commit SHA', 'Tanggal (Date)', 'Hari (Day)', 'Pesan (Message)']);

    console.log('Menulis data ke Google Sheets...');
    await appendToSheet(SPREADSHEET_ID, rows);
    
    console.log('Berhasil menambahkan log harian ke Google Sheets!');
    
  } catch (error) {
    console.error('Terjadi kesalahan selama proses:');
    console.error(error);
  }
}

main();
