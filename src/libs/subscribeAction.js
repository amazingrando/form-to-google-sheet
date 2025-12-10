import { getAccessToken } from './googleAuth';

export const subscribeAction = async (state, formData) => {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    console.error('Missing VITE_GOOGLE_SHEET_ID in environment variables');
    return {
      success: false,
      errors: ['Configuration error. Please contact support.'],
    };
  }

  const rawData = {
    email: formData.get('email')?.trim() || '',
    name: formData.get('name')?.trim() || '',
    links: formData.get('links')?.trim() || '',
    funfacts: formData.get('funfacts')?.trim() || '',
  };

  // Validate required fields
  if (!rawData.email || !rawData.name) {
    return {
      success: false,
      errors: ['Please fill in all required fields (name and email).'],
    };
  }

  console.log('Submitting form data:', { ...rawData, email: rawData.email.substring(0, 5) + '...' });

  try {
    // Get access token
    const accessToken = await getAccessToken();

    // Append data to Google Sheet using REST API
    const range = 'Sheet1!A:D';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[rawData.email, rawData.name, rawData.links, rawData.funfacts]],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Successfully appended to sheet:', result);

    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);

    // Provide more helpful error messages
    let errorMessage = 'An error occurred while submitting your application.';
    if (error.message?.includes('credentials') || error.message?.includes('token')) {
      errorMessage = 'Authentication error. Please contact support.';
    } else if (error.message?.includes('permission') || error.message?.includes('403')) {
      errorMessage = 'Permission denied. Please check spreadsheet access.';
    } else if (error.message?.includes('not found') || error.message?.includes('404')) {
      errorMessage = 'Spreadsheet not found. Please check configuration.';
    }

    return {
      success: false,
      errors: [errorMessage],
    };
  }
};
