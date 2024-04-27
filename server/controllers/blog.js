import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import UserModal from "../models/userModel.js";

export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blog = await blogModel.find();
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new blogModel({ ...blog, authorId: req.userId });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await blogModel.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await blogModel.findByIdAndDelete(id);
  res.json({ message: "Post delete sucessfully" });
};

export const commentBlog = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await blogModel.findById(id);

  post.comments.push(value);

  const updatedPost = await blogModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const getBlogByTags = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await blogModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogByCategory = async (req, res) => {
  const { name } = req.query;
  try {
    const posts = await blogModel.find({ category: name });
    console.log(posts);
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
