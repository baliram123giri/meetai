"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import DashboardCommand from "./dashboard-command";

export default function DasboardNavbar() {
  const { isMobile, toggleSidebar, state } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);
  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className=" flex gap-x-4 items-center border-b py-3 px-4 bg-background">
        <Button onClick={toggleSidebar} className="size-9" variant={"outline"}>
          {isMobile || state === "collapsed" ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          onClick={() => handleOpenChange(true)}
          variant={"outline"}
          size={"sm"}
          className="h-9 flex justify-start w-[250px] items-center font-normal text-muted-foreground hover:text-muted-foreground"
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none flex items-center gap-1 rounded border bg-muted text-xs font-sans text-muted-foreground p-1 px-1.5">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
