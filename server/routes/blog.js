import express from "express";
import {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  commentBlog,
  getBlogByCategory,
} from "../controllers/blog.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.get("/search/category", getBlogByCategory);
router.post("/", auth, createBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);
router.post("/:id/commentPost", commentBlog);

export default router;
