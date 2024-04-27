import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ui/use-toast";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { signin } from "../../actions/user";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { errors } = useSelector((state) => state.errors);
  console.log(errors);
  const [formData, setFormData] = useState(initialState);
  const { toast } = useToast();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Email cannot be blank",
      });
    } else if (formData.password === "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Password cannot be blank",
      });
    } else {
      dispatch(signin(formData, navigate));
      if (errors) {
        toast({
          title: "Error",
          variant: "destructive",
          description: errors,
        });
      }
    }
  };
  useEffect(() => {
    if (errors) {
      toast({
        title: "Error",
        variant: "destructive",
        description: errors,
      });
    }
  }, []);
  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In Into an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign to your account
            </p>
          </div>
          <div className={cn("grid gap-6")}>
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" for="email">
                    Email
                  </Label>

                  <Input
                    className="mt-2"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    auto-capitalize="none"
                    auto-complete="email"
                    auto-correct="off"
                    onChange={handleChange}
                  />
                  <Input
                    className="mt-2"
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
                <Button onClick={handleSubmit}>Sign In with Email</Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  <Link to="/signup">Don't have an account?</Link>
                </span>
              </div>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>
            and
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
