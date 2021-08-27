import express from 'express';

// import { data } from './data';

import { auth } from './auth';
import { content } from './content';
import { pages } from './pages';

export const app = express();

// Apply basic middleware
app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.url}`);
  next();
});


// Controllers
app.use('/auth', auth());
app.use('/content', content());
app.use('/pages', pages());


const port = 8000;
app.listen(port, () => console.log(`API Server running at http://localhost:${port}`));