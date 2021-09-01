import express from 'express';
import faker from 'faker';
import { data } from './data';

declare global {
  namespace Express {
    export interface Request {
      username?: string
    }
  }
}


// import nookies from 'nookies';
// import { data } from './data';

import { auth } from './auth';
import { content } from './content';
import { pages } from './pages';
import { posts } from './posts';
import { users } from './users';

export const app = express();

// Apply basic middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.url}`);
  next();
});
app.use((req, res, next) => {
  // Conditionally load auth
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const username = token.split('=')[1];

  if (username) {
    req.username = username;
  }

  next();
});


// Controllers
app.use('/auth', auth());
app.use('/content', content());
app.use('/pages', pages());
app.use('/posts', posts());
app.use('/users', users());

const randomlyGeneratePosts = () => {
  const timeoutSeconds = faker.datatype.number({ max: 15 }) + 5;
  setTimeout(() => {
    const post = data.generateNewUserPost();
    console.log('>> New Post Generated', post.id);
    randomlyGeneratePosts();
  }, timeoutSeconds * 1000);
}

const port = 8000;
app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
  randomlyGeneratePosts();
});