import { Router } from 'express';
import { data } from './data';
import { generateToken } from './token';

export const auth = () => {
  const router = Router();
  
  router.post('/login', (req, res) => {
    // Handle lookup and login
    const user = Object.values(data.users).find((user) => new RegExp(`^${req.body.email}$`, 'i').test(user.email));

    if (!user) {
      return res.status(403).send('INVALID LOGIN CREDENTIALS');
    }

    if (user && user.password !== req.body.password) {
      return res.status(403).send(`INVALID LOGIN CREDENTIALS (hint: ${user.password})`);
    }

    const token = generateToken(user.username);

    return res.json({ user, token });
  });
  router.post('/logout', (req, res) => {
    res.status(200).send(true);
  });

  return router;
};
