import faker from 'faker';
import { Content } from '../../src/types/Content';
import { Page } from '../../src/types/Page';
import { Post } from '../../src/types/Post';
import { User } from '../../src/types/User';

import { generatePage } from './pages';
import { generatePost } from './posts';
import { generateUser } from './users';

export const generateData = () => {
  faker.seed(12345);

  // Global site content
  const content: Record<string, Content> = {
    homepage: {
      title: 'NextJS Sample Site',
      body: 'Welcome to my NextJS example site!',
    },
    login: {
      title: 'Login',
      body: 'Enter your email and password to access the dashboard',
    },
  }

  // Generate Pages
  const pageCount = faker.datatype.number(10) + 4;
  const pages = Array.from({ length: pageCount })
    .map(() => generatePage())
    .reduce((agg, page) => ({ ...agg, [page.slug]: page }), {} as Record<string, Page>);

  // Generate Users
  const userCount = faker.datatype.number(100) + 100;
  const users = Array.from({ length: userCount })
    .map(() => generateUser())
    .reduce((agg, user) => ({ ...agg, [user.username]: user }), {} as Record<string, User>);

  // Add any additionl users...
  users.matt = generateUser({
    username: 'matt',
    name: 'Matt Anglin',
    email: 'anglin@stanford.edu',
    avatar: 'https://avatars.slack-edge.com/2021-07-29/2321042360438_82b545f7f479b09d25d3_192.png',
    password: 'Password123!',
  });

  const usernames = Object.keys(users);

  // Generate User Posts
  const posts: Record<string, Post> = {};
  const userPosts: Record<string, Post[]> = {}; // Chronological by username
  
  usernames.forEach((username) => {
    const postCount = faker.datatype.number(20);
    const user = users[username];
    userPosts[username] = [];
    
    Array.from({ length: postCount }).forEach(() => {
      const post = generatePost(user);
      
      posts[post.id] = post;
      userPosts[username].push(post);
    });

    userPosts[username].sort((a, b) => a.created > b.created ? -1 : 1);
    user.posts = userPosts[username].map((p) => p.id);
  });

  const userFeeds: Record<string, Post[]> = {};
  
  // Generate User Relationships
  usernames.forEach((username) => {
    const user = users[username];
    const followCount = faker.datatype.number(Math.min(50, userCount));
    const randomUsers = usernames.slice();
    faker.helpers.shuffle(randomUsers);

    userFeeds[username] = [];

    Array.from({ length: followCount }).forEach(() => {
      const followUsername = randomUsers.pop();
      if (username !== followUsername) {
        const followUser = users[followUsername]
        user.following.push(followUsername);
        followUser.followers.push(username);

        // Add posts to feed
        userFeeds[username].push(...userPosts[followUsername]);

        // Randomly star posts
        const randomPosts = userPosts[followUsername].slice();
        faker.helpers.shuffle(randomPosts);
        const postsToLikeCount = faker.datatype.number({ min: 0, max: Math.min(8, randomPosts.length)});

        Array.from({ length: postsToLikeCount }).forEach(() => {
          const post = randomPosts.pop();
          post.stars.push(username);
          user.starredPosts.push(post.id);
        });
      }

      // Resort user feed...
      userFeeds[username].sort((a, b) => a.created > b.created ? -1 : 1);
    });
  });

  // Generate new posts!
  const generateNewUserPost = () => {
    const username = faker.random.arrayElement(usernames);
    const user = users[username];

    const newPost = generatePost(user, new Date().toISOString());
    posts[newPost.id] = newPost;
    userPosts[username].unshift(newPost);

    // Add to follower feeds
    user.followers.forEach((username) => {
      userFeeds[username].unshift(newPost);
    });

    return newPost;
  }

  return {
    content,
    pages,
    users,
    posts,
    userPosts,
    userFeeds,

    generateNewUserPost,
  };
};

export const data = generateData();
