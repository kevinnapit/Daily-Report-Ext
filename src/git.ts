import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface GitCommit {
  sha: string;
  date: string;
  day: string;
  author: string;
  message: string;
}

export async function getDailyGitLog(): Promise<GitCommit[]> {
  // Mengambil commit dari tengah malam (awal hari ini)
  // Format pemisah unik: |-|
  // %H = Commit Hash, %ai = Author Date (ISO 8601), %s = Subject (Message)
  const formatString = '%H|-|%ai|-|%an|-|%s';
  const command = `git log --since="midnight" --pretty=format:"${formatString}"`;

  try {
    const { stdout } = await execAsync(command);
    if (!stdout.trim()) {
      return [];
    }

    const lines = stdout.split('\n').filter(line => line.trim() !== '');

    return lines.map(line => {
      const [sha, isoDateStr, author, message] = line.split('|-|');

      const dateObj = new Date(isoDateStr);

      // Format tanggal: YYYY-MM-DD
      const date = dateObj.toISOString().split('T')[0];

      // Format hari dalam bahasa Indonesia
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const day = days[dateObj.getDay()];

      return {
        sha,
        date,
        day,
        author,
        message
      };
    });
  } catch (error: any) {
    // Jika tidak ada commit atau repository baru inisialisasi, akan error
    if (error.message.includes('does not have any commits yet')) {
      return [];
    }
    throw error;
  }
}
