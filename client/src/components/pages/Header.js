import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateBlog } from "./CreateBlog";
import { Search } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signout = () => {
    dispatch(logout());
    navigate("/login");
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between sticky z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link to="/" className="flex items-center gap-1">
        <p className="text-[26px] font-extrabold text-black max-sm:hidden font-Bricolage">
          Blog
        </p>
      </Link>
      <div className="flex items-center gap-5">
        <Button>
          {" "}
          <Search />
          <Link to="/search" className="ml-1">
            Search
          </Link>{" "}
        </Button>
        <CreateBlog />

        {!user ? (
          <div>
            <Button variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <Button variant="ghost" onClick={signout}>
                  <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
