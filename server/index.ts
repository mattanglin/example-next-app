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
  const timeoutSeconds = faker.datatype.number({ max: 9 }) +1;
  setTimeout(() => {
    const post = data.generateNewUserPost();
    console.log('>> New Post Generated', post.id);

    // Will this post trend?
    const postWillTrend = faker.datatype.number(5) === 3;
    if (postWillTrend) {
      const { starCount } = data.trendPost({ postId: post.id });
      console.log(`>> New Post is trending with ${starCount} stars!`);
    }

    randomlyGeneratePosts();
  }, timeoutSeconds * 1000);
};

const randomlyStarPosts = () => {
  const timeoutSeconds = faker.datatype.number({ max: 5 }) +1;
  setTimeout(() => {
    const result = data.starPost();
    if (result) {
      console.log(`>> Post ${result.postId} starred by ${result.username}`);
    }

    randomlyStarPosts();
  }, timeoutSeconds * 1000);
};

const randomlyTrendPost = () => {
  const timeoutSeconds = (faker.datatype.number({ max: 6 }) + 1) * 30;
  setTimeout(() => {
    const { postId, starCount } = data.trendPost();
    console.log(`>> Post ${postId} trending with ${starCount} stars!!!`);
    
    randomlyTrendPost();
  }, timeoutSeconds * 1000);
}

const randomlyFollowUsers = () => {
  const timeoutSeconds = (faker.datatype.number({ max: 6 }) + 1) * 3;
  setTimeout(() => {
    const { username, follow } = data.followUsers();
    console.log(`>> User ${username} now following ${follow}`);
    
    randomlyFollowUsers();
  }, timeoutSeconds * 1000);
}

const randomlyRegisterUsers = () => {
  const timeoutSeconds = (faker.datatype.number({ max: 6 }) + 1) * 5;
  setTimeout(() => {
    const user = data.registerUser();
    const followCount = faker.datatype.number(Math.floor(Object.keys(data.users).length / 3)) + 5;

    for (let i = 0; i < followCount; i++) {
      setTimeout(() => {
        data.followUsers({ username: user.username });
      }, i * 500);
    }

    console.log(`>> New User ${user.username} registered and following ${followCount} users!`);
    
    randomlyRegisterUsers();
  }, timeoutSeconds * 1000);
}

const port = 8000;
app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
  randomlyGeneratePosts();
  randomlyStarPosts();
  randomlyTrendPost();
  randomlyFollowUsers();
  randomlyRegisterUsers();
});