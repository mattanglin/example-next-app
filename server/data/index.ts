import faker from 'faker';
import { Content } from '../../src/types/Content';
import { Page } from '../../src/types/Page';
import { generatePage } from './pages';

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
  // Generate User Posts
  // Generate User Relationships
  // Generate Post Likes

  return {
    content,
    pages,
  };
};

export const data = generateData();
