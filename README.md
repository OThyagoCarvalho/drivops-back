backend build with nest js and e2e tests, and able to receive post and get requests.

frontend built with react, sass, recharts. not enough time to write unit tests with jest and react testing library.

database with postgres and prismaORM running on docker as specified at the docker-compose file in drivops-back/;

user authentication with JWT, and user password hashing with Argon2

front-end relies on a local environment variable (VITE_API_BASE_URL),
to provide the base API URL eg: http://localhost:3333

back-end relies on a few local environment variables ( DATABASE_URL, CORS_ORIGIN(to whitelist the front-end url), JWT_SECRET=). also, there are environment variables for the e2e testing, decoupling the testing database from que actual database (DATABASE_URL,JWT_SECRET).

steps to run :

at backend :
 - npm run start:dev to bootstrap the server with hot-reload,
 - npm run db:dev:restart to bootstrap database (must provide docker url with DATABASE_URL)
 - npm run test:e2e to run backend e2e tests
 - api expects strict data types according to the route, as specified in each of it's respectives DTO files.

at frontend : 
- npm run dev to bootstrap frontend with hot-reload;
- should create a user at index page '/' (signup page)
- should signin with the created user at '/signin'
- should be able to create salesmen (vendedores), cars (carros), sales (vendas); 
- should be logged out as soon as the JWT token expires as a consequence of receiving

DISCLAIMER: LEFT ENV FILES AT THE PROJECTS SINCE THERE'S NO REAL SENSITIVE INFORMATION! 

video demonstration at : https://drive.google.com/file/d/1n2Alrzclp9XPw-aC14qemRkWUJzt-e7B/view?usp=share_link

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
