import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
  console.log(blog);
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <img className="w-[350px] h-[160px]" src={blog.selectedFile}></img>
        <CardTitle>
          <span className="font-Bricolage">{blog.title}</span>
        </CardTitle>
        <CardDescription>
          <span className="font-Bricolage">{blog.content}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-3">
            <span className="text-sm text-[#0F730C] font-Bricolage">
              {blog.author}
            </span>
            <span className="text-xs font-Bricolage">
              {moment(blog.createAt).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full">
          <Button className="w-full">
            <Link to={`/blog/${blog._id}`}>Read More</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Blog;
