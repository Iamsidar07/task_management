"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function SigninForm() {
  const router = useRouter();
  const signin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const remember = Boolean(formData.get("remember"));
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({
      remember,
      email,
      password,
    });
    try {
      await axios.post("/api/user/signin", {
        remember,
        email,
        password,
      });
      router.push("/");
    } catch (error) {
      console.log("Failed to signin", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={signin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input name="password" id="password" type="password" required />
          </div>
          <div className="gap-2 flex">
            <Checkbox name="remember" id="remember" />
            <Label htmlFor="remember" className="font-semibold cursor-pointer">
              Remember me
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
