import { Router } from 'express';
import { data } from './data';

declare global {
  namespace Express {
    export interface Request {
      username?: string
    }
  }
}

const PAGE_SIZE = 15

export const posts = () => {
  const router = Router();

  router.get('/user/:username', (req, res) => {
    // Attach relationship
    if (req.params.username && data.users[req.params.username]) {
      const user = data.users[req.params.username];
      const from = req.query.from as string;
      
      const userPosts = data.userPosts[user.username];
      const startIdx = from ? user.posts.indexOf(from) + 1 : 0;
      const toIdx = startIdx + PAGE_SIZE;
      const posts = data.userPosts[user.username].slice(startIdx, toIdx);

      return res.status(200).send(posts);
    }

    res.status(404).send('NOT FOUND');
  });

  router.get('/feed', (req, res) => {
    if (!req.username) {
      return res.status(401).send('UNAUTHORIZED');
    }

    const from = req.query.from as string;
    
    const feedPosts = data.userFeeds[req.username];
    const startIdx = from ? feedPosts.findIndex((p) => p.id === from) + 1 : 0;
    const toIdx = startIdx + PAGE_SIZE;

    const feed = feedPosts.slice(startIdx, toIdx);
    res.status(200).send(feed);
  });

  router.post('/star:id', (req, res) => {
    if (!req.username) {
      return res.status(401).send('UNAUTHORIZED');
    }
    const postId = req.params.id;
    const post = data.posts[postId];
    const user = data.users[req.username];

    if (!post) {
      return res.status(404).send('NOT FOUND');
    }

    post.stars = [
      ...post.stars.filter((u) => u !== user.username),
      user.username,
    ];
    user.starredPosts = [
      ...user.starredPosts.filter((p) => p !== postId),
      postId,
    ];

    res.status(200).send({ post, user });
  });
  router.post('/unstar/:id', (req, res) => {
    if (!req.username) {
      return res.status(401).send('UNAUTHORIZED');
    }

  });

  return router;
}

