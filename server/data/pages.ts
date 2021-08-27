import faker from 'faker';
import { Page } from '../../src/types/Page';

export const generatePage = () => {
  const page: Page = {
    slug: faker.lorem.slug(faker.datatype.number(4) + 1),
    title: faker.lorem.words(faker.datatype.number(4) + 2),
    content: faker.lorem.paragraphs(faker.datatype.number(4) + 2),
  }
  return page;
};
