import { Schema, model } from 'mongoose';

export const category = {
  NONE: null,
};

const BookSchema = new Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  category: {
    type: String,
    default: category.NONE,
  },
  google_link: {
    type: String,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    { default: [] },
  ],
});

export default model('Book', BookSchema);
