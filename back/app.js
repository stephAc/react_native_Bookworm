import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import Database from './src/config/Database.config';
import router from './src/config/router.config';

const app = express();
const port = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

Database.getConnection().then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
