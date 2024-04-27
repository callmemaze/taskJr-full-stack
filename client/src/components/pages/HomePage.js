import React, { useEffect, useState } from "react";
import Header from "./Header";
import Blogs from "./Blogs/Blogs";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/blog";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <>
      <Header />
      <div className="p-10">
        <Blogs setCurrentId={setCurrentId} />
      </div>
    </>
  );
};

export default HomePage;
