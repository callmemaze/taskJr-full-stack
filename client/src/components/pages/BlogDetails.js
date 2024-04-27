import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost } from "../actions/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentSection from "./CommentSection";
import Header from "./Header";
import { Button } from "../ui/button";
import { EditBlog } from "./EditBlog";

const BlogDetails = () => {
  const { blog, blogs } = useSelector((state) => state.blog);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  if (!blog) return null;
  return (
    <>
      <Header />

      <div className="w-full p-10">
        <div className="w-full flex justify-center">
          <span className="text-2xl font-Bricolage"> {blog.title} </span>
        </div>
        <div className="w-full h-56 mt-10 rounded">
          <img src={blog.selectedFile} className="w-full h-full rounded" />
        </div>
        <div className="flex mt-10">
          <div className="w-72">
            <div className="flex">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="pl-3">
                <span className="text-xs font-Bricolage">{blog.author}</span>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs">Published </span>
              <span className="text-xs ml-1">
                {moment(blog.createAt).fromNow()}{" "}
              </span>
            </div>
            <div>
              <span className="text-xs ont-Bricolage">{blog.tags}</span>
            </div>
            <div>
              <span className="text-xs font-Bricolage">{blog.category}</span>
            </div>
            <div className="mt-5 w-full">
              {user?.result?._id === blog.authorId ? (
                <EditBlog blog={blog} />
              ) : null}
            </div>
          </div>

          <div className="">
            <div className="h-72">
              <p className="ont-Bricolage text-lg"> {blog.content} </p>
            </div>
            <CommentSection blog={blog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
