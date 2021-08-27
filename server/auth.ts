import { Router } from 'express';
import { data } from './data';
import { token } from './token';

export const auth = () => {
  const router = Router();
  
  router.post('/login', (req, res) => {
    console.log(req.body);
    // Handle lookup and login
    const user = Object.values(data.users).find((user) => new RegExp(`^${req.body.email}$`, 'i').test(user.email));

    if (!user) {
      return res.status(403).send('INVALID LOGIN CREDENTIALS');
    }

    if (user && user.password !== req.body.password) {
      return res.status(403).send(`INVALID LOGIN CREDENTIALS (hint: ${user.password})`);
    }

    return res.json({ user, token });
  });

  return router;
};
