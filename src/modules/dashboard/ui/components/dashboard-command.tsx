import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import React, { Dispatch } from "react";
interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}
export default function DashboardCommand({
  open,
  setOpen,
}: DashboardCommandProps) {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput  placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
