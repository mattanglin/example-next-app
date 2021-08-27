import { Router } from 'express';
import { data } from './data';

export const content = () => {
  const router = Router();

  router.get('/:key', (req, res) => {
    if (req.params.key && data.content[req.params.key]) {
      return res.json(data.content[req.params.key])
    }
    res.status(404).send('NOT_FOUND');
  });

  return router;
}

