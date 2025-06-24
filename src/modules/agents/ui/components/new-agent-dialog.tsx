import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import AgentForm from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}
export default function NewAgentDialog({
  onOpenChange,
  open,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
