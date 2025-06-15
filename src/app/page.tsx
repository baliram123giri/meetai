"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type LoginFormData = {
  email: string;
  password: string;
};
type FormData = {
  name: string;
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormData) => {
    // handle form submission
    await authClient.signIn.email(data, {
      onError() {
        alert("An error occurred during Sign In.");
      },
      onSuccess() {
        alert("Sign In successful!");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // handle form submission
    await authClient.signUp.email(data, {
      onError() {
        alert("An error occurred during registration.");
      },
      onSuccess() {
        alert("Registration successful!");
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-lg">You are already logged in.</p>
        <Button
          variant={"destructive"}
          onClick={() =>
            authClient
              .signOut()
              .then(() => (window.location.pathname = "/sign-in"))
          }
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex justify-center min-h-screen gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">
            Register
          </Button>
        </form>
      </Form>

      <LoginForm />
    </div>
  );
}
