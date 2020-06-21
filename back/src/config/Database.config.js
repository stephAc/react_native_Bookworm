import mongoose from 'mongoose';

import { url } from './url.config';

class Database {
  constructor() {
    mongoose.set('useCreateIndex', true);
  }

  getConnection() {
    return mongoose.connect(url.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
