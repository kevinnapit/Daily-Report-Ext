# Daily Report Git Extension

A TypeScript-based script that automatically fetches the daily Git commit log from your local repository and exports it as a tabular report to Google Sheets. This project serves as a foundational step toward building a full VSCode Extension or CLI tool.

## Key Features

- **Automated Reporting:** Reads commit data (`Commit SHA`, `Date`, `Day`, `Message`) that occurred from midnight to the current time.
- **Google Sheets Integration:** Utilizes the Google Sheets API and Service Account authentication to write directly to your target spreadsheet.
- **Security-First:** Uses a `.env` file to prevent hardcoding secret IDs, and a `.gitignore` file to ensure credentials are never leaked into the version control system.

## Prerequisites

- Node.js (version 16 or newer is recommended).
- Git installed on your machine.
- A Google Cloud Service Account with access to the Google Sheets API.
- A target Google Spreadsheet that has been shared with your Service Account email with **Editor** access.

## Setup & Installation

1. **Install Dependencies**
   Open a terminal in the root directory of this project and run:
   ```bash
   npm install
   ```

2. **Configure Service Account Credentials**
   - Create a folder named `credentials` in the root directory of the project.
   - Place your Service Account JSON file inside this folder.
   - Rename the file to `service-account.json`.

3. **Set Environment Variables**
   - Create a `.env` file (or open it if it already exists).
   - Add your *Spreadsheet ID* (this ID can be found in the URL of your Google Spreadsheet):
     ```env
     SPREADSHEET_ID=your_spreadsheet_id_here
     ```

## Usage

1. Make sure you have at least one new commit made today so the script has data to report. If not, make a test commit.
2. Run the following command in your terminal:
   ```bash
   npm start
   ```
3. The script will read your Git logs and print its status to the terminal. If successful, your report data will automatically be appended as new rows in your Google Sheet.

## Core Project Structure

- `src/git.ts`: Handles Git command-line operations and parsing.
- `src/sheets.ts`: Manages authentication and the Google Sheets API requests.
- `src/index.ts`: The main entry point that brings the logic together.

---
*Built to streamline the productivity of daily performance tracking.*
