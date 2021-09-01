import faker from 'faker';
import { Post } from '../../src/types/Post';
import { User } from '../../src/types/User';

export const generatePost = (user: User, date?: string) => {
  const title = faker.company.catchPhrase();
  const slug = faker.helpers.slugify(title);
  const published = faker.datatype.number(4) != 2;
  const created = date || faker.date.recent(30).toISOString();

  const post: Post = {
    id: faker.datatype.uuid(),
    username: user.username,
    name: user.name,
    userAvatar: user.avatar,
    title,
    slug,
    image: faker.datatype.number({ max: 4 }) === 2 ? faker.image.image() : undefined,
    body: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 4 })),
    published,
    created,
    stars: [],
  }

  return post;
};
