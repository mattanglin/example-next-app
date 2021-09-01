import { NextApiHandler } from 'next';
import axios, { Method, AxiosError } from 'axios';
import { getServerAuth } from '../../lib/auth';
import nookies from 'nookies';

const proxyClient = axios.create({
  baseURL: 'http://localhost:8000',
});

// Simple API proxy for CORS
const handler: NextApiHandler = async (req, res) => {
  const proxyURL = (req.url || '').replace(/^\/api/i, '');
  
  try {
    // Proxy to api
    // const cookies = nookies.get({ req });
    const token = getServerAuth(req);
    const headers = {} as Record<string, string>;

    // Re-eattch auth-token as auth headers
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const result = await proxyClient.request({
      method: req.method as Method,
      url: proxyURL,
      data: req.body,
      headers,
    });

    // Handle auth cookies

    // Login/Logout
    if (result.data && result.data.token) {
      nookies.set({ res }, 'auth-token', result.data.token, { httpOnly: false, path: '/' });
      // setCookie(res, 'token', result.data.token, { sameSite: 'lax' });
    } else if (/^\/auth\/logout/.test(proxyURL)) {
      console.log('API LOGOUT')
      nookies.destroy({ res }, 'auth-token');
    }
    
    res.status(result.status).send(result.data);
    res.end();
  } catch (err) {
    const error = err as AxiosError;
    console.log('ERROR:', error.response?.data);
    res.status(error.response?.status || 500).json(error.response?.data);
  }
}

export default handler;
