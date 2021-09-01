import { Router } from 'express';
import { data } from './data';

declare global {
  namespace Express {
    export interface Request {
      username?: string
    }
  }
}

export const users = () => {
  const router = Router();

  router.get('/:username', (req, res) => {
    // Attach relationship
    if (req.params.username && data.users[req.params.username]) {
      const user = data.users[req.params.username];
      const relationship = {
        isUser: false,
        isFollowing: false,
        isFollowedBy: false,
      };
      
      if (req.username) {
        if (req.params.username === req.username) {
          relationship.isUser = true;
        } else {
          if (user.followers.includes(req.username)) {
            relationship.isFollowing = true;
          }
          if (user.following.includes(req.username)) {
            relationship.isFollowedBy = true;
          }
        }
      }

      const userWithRelationship = {
        ...user,
        ...relationship,
      };


      return res.json(userWithRelationship);
    }

    res.status(404).send('NOT FOUND');
  });

  router.post('/:username/follow', (req, res) => {
    const username = req.username;
    if (!username) {
      return res.status(401).send('UNAUTHORIZED');
    }
    const followName = req.params.username;
    const followUser = data.users[followName];
    const user = data.users[username];

    if (!followUser) {
      return res.status(404).send('NOT FOUND');
    }

    followUser.followers = [
      ...followUser.followers.filter((u) => u !== username),
      username,
    ];
    user.following = [
      ...user.following.filter((u) => u !== followName),
      followName,
    ];
    // Cleanup user feed
    const feed = data.userFeeds[username];
    data.userFeeds[username] = [
      ...feed.filter((p) => p.username !== followName),
      ...data.userPosts[followName]
    ];
    data.userFeeds[username].sort((a, b) => a.created > b.created ? -1 : 1);

    res.send(202).send('FOLLOWED');
  });

  router.post('/:username/unfollow', (req, res) => {
    const username = req.username;

    if (!username) {
      return res.status(401).send('UNAUTHORIZED');
    }
    const unfollowName = req.params.username;
    const unfollowUser = data.users[unfollowName];
    const user = data.users[username];

    if (!unfollowUser) {
      return res.status(404).send('NOT FOUND');
    }

    unfollowUser.followers = unfollowUser.followers.filter((u) => u !== username);
    user.following = user.following.filter((u) => u !== unfollowName);
    // Cleanup user feed
    const feed = data.userFeeds[username];
    data.userFeeds[username] = feed.filter((p) => p.username !== unfollowName);

    res.send(202).send('UNFOLLOWED');
  });

  return router;
}

