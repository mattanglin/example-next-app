import { IncomingMessage } from 'http';
import nookies from 'nookies';

export const getServerAuth = (req: IncomingMessage) => {
  const cookies = nookies.get({ req });
  return cookies['auth-token'];
}