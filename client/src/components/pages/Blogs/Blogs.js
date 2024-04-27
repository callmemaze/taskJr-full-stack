import React, { useEffect } from "react";

import Blog from "./Blog/Blog";
import { useSelector } from "react-redux";
import { Progress } from "../../ui/progress";

const Blogs = () => {
  const blog = useSelector((state) => state.blog);
  const [progress, setProgress] = React.useState(13);
  console.log(blog);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return !blog.length ? (
    <div className="flex-col justify-center items-center h-40">
      <Progress value={progress} className="w-[60%]" />
      <span className="mt-10"> Please wait ...... </span>
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-3">
      {blog.map((post) => (
        <div key={post._id} className="grid w-[400px]">
          <Blog blog={post} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
