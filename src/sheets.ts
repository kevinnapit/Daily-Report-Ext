import { google } from 'googleapis';
import path from 'path';

// Lokasi file Service Account JSON
const KEY_FILE_PATH = path.join(process.cwd(), 'credentials', 'service-account.json');

// Scope (Izin) yang dibutuhkan untuk mengedit spreadsheet
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function appendToSheet(spreadsheetId: string, values: string[][]) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client as any });

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1', // Ganti 'Sheet1' dengan nama sheet yang sesuai jika berbeda
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Gagal menulis ke Google Sheets:', error);
    throw error;
  }
}
