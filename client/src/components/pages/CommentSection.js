import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { commentPost } from "../actions/blog";

const CommentSection = ({ blog }) => {
  console.log(blog.comments);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(blog?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, blog._id)
    );
    setComment("");
    setComments(newComments);
  };

  return (
    <div>
      <div>
        <span className="text-2xl font-Bricolage"> Comments </span>
        {comments?.map((c, i) => (
          <p key={i}>
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </p>
        ))}
      </div>
      <div className="flex flex-col space-y-1.5 mt-3 w-96">
        <Label htmlFor="name">Write a comment</Label>
        <Textarea
          className="w-full mt-5"
          id="comment"
          placeholder="Type your message here."
          onChange={(e) => setComment(e.target.value)}
        />
        <Button>
          {" "}
          <span className="font-Bricolage" onClick={handleComment}>
            {" "}
            Submit{" "}
          </span>{" "}
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
