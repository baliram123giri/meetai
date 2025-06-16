"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";

export default function HomeView() {
  const { data: session, isPending } = authClient.useSession();
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
        <Image
          src={session.user.image || "/default-avatar.png"}
          height={100}
          width={100}
          alt="profile picture"
          className="rounded-full  shadow-xl"
        />
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-lg">You are already logged in.</p>
        <Button
          variant={"default"}
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
}
