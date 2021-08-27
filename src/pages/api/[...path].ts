import { NextApiHandler } from 'next';
import axios, { Method, AxiosError } from 'axios';

const proxyClient = axios.create({
  baseURL: 'http://localhost:8000',
});

// Simple API proxy for CORS
const handler: NextApiHandler = async (req, res) => {
  const proxyURL = (req.url || '').replace(/^\/api/i, '');
  
  try {
    const result = await proxyClient.request({
      method: req.method as Method,
      url: proxyURL,
      data: req.body,
    });
    res.status(result.status).send(result.data);
  } catch (err) {
    const error = err as AxiosError;
    console.log('ERROR:', error.response?.data);
    res.status(error.response?.status || 500).json(error.response?.data);
  }
}

export default handler;
