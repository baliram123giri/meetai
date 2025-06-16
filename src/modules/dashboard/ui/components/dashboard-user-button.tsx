import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";

import { ChevronDown, CreditCard, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

export default function DashboardUserButton() {
  const { data: session, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();
  if (!session || isPending) {
    return null;
  }
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex flex-col items-center p-3 gap-2 rounded-lg border border-border/10 w-full bg-white/5 hover:bg-white/10 overflow-hidden">
          {session.user.image ? (
            <Avatar>
              <AvatarImage src={session.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={session.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 items-center  text-left overflow-hidden  flex-1 min-w-0">
            <p className="text-sm truncate font-semibold w-full">
              {session.user.name}
            </p>
            <p className="text-sm truncate w-full">{session.user.email}</p>
          </div>
          <ChevronDown className="size-4  shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{session.user.name}</DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={"outline"}>
              Billing <CreditCard className="size-4 text-black" />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => authClient.signOut().then(() => router.push("/"))}
            >
              Logout <LogOutIcon className="size-4 text-black" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-3 gap-2 rounded-lg border border-border/10 w-full bg-white/5 hover:bg-white/10 overflow-hidden">
        {session.user.image ? (
          <Avatar>
            <AvatarImage src={session.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={session.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 items-center  text-left overflow-hidden  flex-1 min-w-0">
          <p className="text-sm truncate font-semibold w-full">
            {session.user.name}
          </p>
          <p className="text-sm truncate w-full">{session.user.email}</p>
        </div>
        <ChevronDown className="size-4  shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{session.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center cursor-pointer justify-between">
          Billing <CreditCard className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => authClient.signOut().then(() => router.push("/"))}
          className="flex items-center cursor-pointer justify-between"
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
