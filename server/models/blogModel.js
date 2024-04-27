import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  authorId: String,
  tags: [String],
  category: String,
  comments: { type: [String], default: [] },
  createAt: {
    type: Date,
    default: new Date(),
  },
  selectedFile: String,
});

const blog = mongoose.model("blog", blogSchema);

export default blog;
