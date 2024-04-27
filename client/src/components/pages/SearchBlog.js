import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPostsByCategory } from "../actions/blog";
import Blog from "./Blogs/Blog/Blog";
import SearchPost from "./SearchPost";
import { combineSlices } from "@reduxjs/toolkit";
import Header from "./Header";

const SearchBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { blog } = useSelector((state) => state.blog);
  const [category, setCategory] = useState("");
  const handleChange = (e) => {
    setCategory(e);
  };
  const searchPost = () => {
    if (category) {
      dispatch(getPostsByCategory(category));
      navigate(`/search/?name=${category}`);
    } else {
      navigate("/");
    }
  };
  const { name } = useParams();
  console.log(name);
  useEffect(() => {
    dispatch(getPostsByCategory(name));
  }, []);
  console.log(blog);
  return (
    <>
      <Header />
      <div className="flex p-10">
        <div className="w-4/5">
          {blog?.map((x) => (
            <div key={x._id} className="grid w-[400px]">
              <Blog blog={x} />
            </div>
          ))}
        </div>
        <div>
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Category">Category</Label>
                    <Select onValueChange={handleChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between w-full">
              <Button className="w-full" onClick={searchPost}>
                Search
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SearchBlog;
