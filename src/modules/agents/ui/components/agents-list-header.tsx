"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentDialog from "./new-agent-dialog";

export default function AgentsListHeader() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <NewAgentDialog open={openDialog} onOpenChange={setOpenDialog} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex item-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setOpenDialog(true)}>
            <PlusIcon /> New Agent
          </Button>
        </div>
      </div>
    </>
  );
}
