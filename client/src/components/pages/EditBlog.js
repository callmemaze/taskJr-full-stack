import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../actions/blog";
import FileBase from "react-file-base64";
import { useParams } from "react-router-dom";

export function EditBlog({ blog }) {
  const [blogData, setBlogData] = useState({
    author: "",
    title: blog.title,
    content: blog.content,
    category: blog.category,
    tags: blog.tags,
    selectedFile: blog.selectedFile,
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.id]: e.target.value });
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(id, { ...blogData, author: user?.result?.name }));
  };
  const clear = () => {
    setBlogData({
      title: "",
      content: "",
      category: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleSelectChange = (e) => {
    setBlogData({ ...blogData, category: e });
  };
  const handleTagsChange = (e) => {
    setBlogData({ ...blogData, tags: e });
  };
  console.log(blogData);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center bg-black p-1.5 rounded cursor-pointer w-[200px]">
          <div className="ml-1 ">
            <span className="text-white font-Bricolage text-sm">Edit Blog</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              onChange={handleChange}
              defaultValue={blog.title}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Input
              id="content"
              className="col-span-3"
              onChange={handleChange}
              defaultValue={blog.content}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categories
            </Label>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={blog.category}
            >
              <SelectTrigger id="category" className="w-[250px]">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Select onValueChange={handleTagsChange} defaultValue={blog.tags}>
              <SelectTrigger id="tags" className="w-[250px]">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Add Photo
            </Label>
            <FileBase
              type="file"
              className="w-[200px]"
              multiple={false}
              onDone={({ base64 }) =>
                setBlogData({ ...blogData, selectedFile: base64 })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Edit Blog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
