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
import { FormEvent, useTransition } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function SigninForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const signin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const remember = Boolean(formData.get("remember"));
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({
      remember,
      email,
      password,
    });
    startTransition(async () => {
      try {
        await axios.post("/api/user/signin", {
          remember,
          email,
          password,
        });
        router.push("/");
      } catch (error) {
        console.log("Failed to signin", error);
        toast.error(
          error instanceof AxiosError
            ? JSON.parse(error.response?.data.message)[0].message
            : "Failed to signin",
        );
      }
    });
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
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>
          <div className="gap-2 flex">
            <Checkbox name="remember" id="remember" />
            <Label htmlFor="remember" className="font-semibold cursor-pointer">
              Remember me
            </Label>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader className="animate-spin w-4 h-4 mr-1.5" />
            ) : null}
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
