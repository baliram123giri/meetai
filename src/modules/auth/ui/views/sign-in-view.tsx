"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignInView() {
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  // Initialize the form with zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null); // Reset error state before submission
    setIsPending(true); // Set pending state to true
    await authClient.signIn.email(data, {
      onError(error) {
        setIsPending(false); // Reset pending state on error
        // Set error message from the error response
        setError(error.error.message || "An error occurred during Sign In.");
      },
      onSuccess() {
        setIsPending(false); // Reset pending state after successful sign-in
        // handle successful sign-in
        router.push("/");
      },

      // handle form submission
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col text-center items-center">
                  <h1 className="text-2xl font-semibold">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account to continue
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
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
              </div>
              {!!error && (
                <Alert className="bg-destructive/10 border-none mt-2">
                  <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="w-full mt-4"
              >
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
              <div className="my-3 relative text-center after:border-border text-sm  after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  disabled={isPending}
                  onClick={() => {
                    setIsPending(true);
                    authClient.signIn
                      .social({
                        provider: "google",
                      })
                      .then(() => setIsPending(false));
                  }}
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <FcGoogle /> <span className="text-sm">Google</span>
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    setIsPending(true);
                    authClient.signIn
                      .social({
                        provider: "github",
                      })
                      .then(() => setIsPending(false));
                  }}
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <FaGithub /> <span className="text-sm">GitHub</span>
                </Button>
              </div>
              <div className="text-sm mt-4 text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
          <div className="bg-radial hidden from-green-700 to-green-900 relative  md:flex  flex-col justify-center items-center">
            <img src="logoIcon.svg" alt="image" className="w-[70px] h-[70px]" />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms Of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
}
