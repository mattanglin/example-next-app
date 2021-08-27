import { Router } from 'express';
import { data } from './data';

export const pages = () => {
  const router = Router();

  router.get('/', (req, res) => {
    const slugs = Object.keys(data.pages);
    res.json({ slugs });
  });

  router.get('/:slug', (req, res) => {
    if (req.params.slug && data.pages[req.params.slug]) {
      return res.json(data.pages[req.params.slug])
    }
  });

  return router;
}

