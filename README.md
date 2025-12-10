# Form to Google Sheet

A React application that allows users to submit form data directly to a Google Sheet using Google Service Account authentication. Built with React, Vite, and Tailwind CSS.

## Features

- 📝 Simple form interface for collecting user information
- 📊 Direct submission to Google Sheets via REST API
- 🔐 Secure authentication using Google Service Account JWT
- ✅ Form validation and error handling
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development experience with Vite

## Prerequisites

- Node.js (see `.nvmrc` for version)
- A Google Cloud Project with:
  - Google Sheets API enabled
  - A Service Account with credentials
  - A Google Sheet shared with the service account email

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form-to-google-sheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Service Account**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create a Service Account and download the JSON key file
   - Share your Google Sheet with the service account email (found in the JSON file)

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_SHEET_ID=your-spreadsheet-id
   VITE_GOOGLE_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
   VITE_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

   **Note:** The `VITE_GOOGLE_PRIVATE_KEY` should include the full private key with `\n` characters preserved (or use actual newlines).

5. **Get your Google Sheet ID**
   - Open your Google Sheet
   - The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` and add it to your `.env` file

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Building for Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How It Works

1. **Form Submission**: Users fill out the form with their name, email, qualifications/portfolio links, and a fun fact.

2. **Validation**: The form validates that required fields (name and email) are filled.

3. **Authentication**: The app uses Google Service Account credentials to generate a JWT token and exchange it for an OAuth2 access token.

4. **Sheet Update**: The form data is appended to the Google Sheet using the Google Sheets REST API.

5. **User Feedback**: Users see a success message after successful submission, or error messages if something goes wrong.

## Project Structure

```
form-to-google-sheet/
├── src/
│   ├── components/
│   │   └── Form.jsx          # Main form component
│   ├── libs/
│   │   ├── googleAuth.js     # Google authentication logic
│   │   └── subscribeAction.js # Form submission action
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Application entry point
├── .env.example              # Example environment variables
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Google Sheets API** - For writing data to sheets
- **jose** - JWT token generation
- **React Server Actions** - Form handling

## Troubleshooting

### Authentication Errors
- Ensure your service account email has access to the Google Sheet
- Verify that the private key in `.env` is correctly formatted with newlines
- Check that the Google Sheets API is enabled in your Google Cloud project

### Sheet Not Found
- Verify the `VITE_GOOGLE_SHEET_ID` is correct
- Ensure the sheet is shared with the service account email

### Build Issues
- Make sure all environment variables are set
- Check that Node.js version matches `.nvmrc`

## License

This project is private and proprietary.
