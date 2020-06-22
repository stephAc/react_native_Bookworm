import { Schema, model } from 'mongoose';

export const role = {
  ADMIN: 30,
  CLIENT: 20,
};

const UserSchema = new Schema({
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  role: {
    type: Number,
    default: role.CLIENT,
  },
  book: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    { default: [] },
  ],
  session_token: {
    type: String,
    default: '',
  },
});

export default model('User', UserSchema);
