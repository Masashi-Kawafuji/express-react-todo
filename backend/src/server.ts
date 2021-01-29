import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes';
import sequelize from './db/sequelize';

const app = express();

// loading middlewares.
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
})();