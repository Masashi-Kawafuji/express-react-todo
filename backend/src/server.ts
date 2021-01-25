import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import sequelize from './db/sequelize';

const app = express();

// loading middlewares.
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
})();