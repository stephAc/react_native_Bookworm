import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      default: null,
    },
    opinion: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export default model('Comment', CommentSchema);
