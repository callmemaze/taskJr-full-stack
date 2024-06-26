import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";
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
import { createPost } from "../actions/blog";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

export function CreateBlog() {
  const [blogData, setBlogData] = useState({
    author: "",
    title: "",
    content: "",
    category: "",
    tags: "",
    selectedFile: "",
  });
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.id]: e.target.value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (blogData.title === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Title cannot be blank",
      });
    } else if (blogData.content === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Content cannot be blank",
      });
    } else if (blogData.category === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Category cannot be blank",
      });
    } else if (blogData.tags === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Tags cannot be blank",
      });
    } else {
      dispatch(createPost({ ...blogData, author: user?.result?.name }));
      navigate("/");
    }
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
        <div className="flex items-center justify-between bg-black p-1.5 rounded cursor-pointer">
          <SquarePlus color="white" />
          <div className="ml-1">
            <span className="text-white font-Bricolage text-sm">
              Post a Blog
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Input
              id="content"
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categories
            </Label>
            <Select onValueChange={handleSelectChange}>
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
            <Select onValueChange={handleTagsChange}>
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
          <Button onClick={handleSubmit}>Post Blog</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
