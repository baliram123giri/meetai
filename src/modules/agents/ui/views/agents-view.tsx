"use client";

import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <ResponsiveDialog
        open={true}
        onOpenChange={() => {}}
        title="Agents"
        description="List of agents"
      >
        <Button>Section</Button>
      </ResponsiveDialog>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
