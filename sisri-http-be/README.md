# HMIT WEB - Back End

## How To Run This Project

1. Clone this project

```
git clone https://github.com/futurest2024/backend-futurest2024.git
```

2. Copy `.env.sample` to `.env.development` to configure a custom environment

```
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=
DATABASE_HOST=
PORT=
NODE_ENV="development"
```

3. Run `yarn install`

4. If you want to use docker for the database, run `yarn setup:dev`

5. Then run `yarn migrate:dev` and then `yarn seed:dev`

6. To run the project, run `yarn start:dev`

7. Use postman for testing
