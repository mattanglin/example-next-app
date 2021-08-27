import { Router } from 'express';
import { data } from './data';

export const users = () => {
  const router = Router();

  router.get('/:username', (req, res) => {
    console.log('Looking up user...', req.params.username);
    if (req.params.username && data.users[req.params.username]) {
      return res.json(data.users[req.params.username])
    }

    res.status(404).send('NOT FOUND');
  });

  return router;
}

