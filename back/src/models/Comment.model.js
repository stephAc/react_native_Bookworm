import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    score: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true },
);

export default model('Comment', CommentSchema);
