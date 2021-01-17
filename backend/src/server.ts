import express from 'express';
import Todo from './models/todo';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});