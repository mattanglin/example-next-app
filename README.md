# example-next-ap

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Roadmap
- [x] create mock api service
- [x] 404 page
- [x] generate static page examples, querying from api using `getSaticProps`
- [x] generate dynamic page routes examples, querying from api use `getStaticPaths`
- [x] generate dynamic ssr page examples, querying from api using `getServerSideProps`
- [x] generate dynamic page examples, querying in client useing `useSWR`
- [x] Protected pages and Auth
- [ ] redux?

## App example
Build basic blog app with the following entities:
- User
  - username
  - email
  - bio
  - password
  - avatar
  - private?
- Post
  - title
  - image
  - body
  - created
  - published

### Pages:
- Homepage (Public) [getStaticPaths/getStaticProps]
- About (Public) [getStaticPaths/getStaticProps]
- Register (Public) [getStaticProps]
- Login (Public) [getStaticProps]
- User Profile (w/ published posts) (public) [getServerSideProps]
- Followers / Following
- User Post Page (public) [getServerSideProps]
- User Dashboard (w/ all posts) (private) [clientFetch]
- User settings (private) [clientFetch]

### API
- Site content controller
- auth controller
- user controller
- post controller