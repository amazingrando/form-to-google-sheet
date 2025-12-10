import { SignJWT, importPKCS8 } from 'jose';

/**
 * Get an access token using JWT authentication
 * This uses the Google Sheets REST API directly without Node.js dependencies
 */
export const getAccessToken = async () => {
  const clientEmail = import.meta.env.VITE_GOOGLE_CLIENT_EMAIL;
  const privateKey = import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google credentials. Please check your .env file.');
  }

  // Import the private key using jose
  const key = await importPKCS8(privateKey, 'RS256');

  // Create JWT for service account authentication
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
  })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600) // Token expires in 1 hour
    .sign(key);

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
};
