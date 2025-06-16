"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.hello.queryOptions({ text: "Testing Baliram" })
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">{data?.greeting}</div>
  );
}
