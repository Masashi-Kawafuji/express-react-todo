import express from 'express';
import logger from './logger';
import router from './routes';

const app = express();

// loading middlewares.
app.use(logger);
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});