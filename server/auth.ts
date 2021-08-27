import { Router } from 'express';

export const auth = () => {
  const router = Router();
  
  router.post('/login', (req, res) => {
    // Handle lookup and login
  });

  return router;
};
