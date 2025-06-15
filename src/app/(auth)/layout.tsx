import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/"); // Redirect to home if session exists
  }
  return (
    <div className="bg-muted flex flex-col min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>;
    </div>
  );
}
