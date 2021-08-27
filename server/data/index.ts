import faker from 'faker';
import { Content } from '../../src/types/Content';
import { Page } from '../../src/types/Page';
import { User } from '../../src/types/User';

import { generatePage } from './pages';
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
  
  // Generate User Posts
  // Generate User Relationships
  // Generate Post Likes

  return {
    content,
    pages,
    users,
  };
};

export const data = generateData();
