import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
}
export default function GeneratedAvatar({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) {
  let svg;
  if (variant === "botttsNeutral") {
    svg = createAvatar(botttsNeutral, {
      seed: seed,
    });
  } else if (variant === "initials") {
    svg = createAvatar(initials, {
      seed,
      fontSize: 42,
      fontWeight: 500,
    });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={svg?.toDataUri()} alt="avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()} </AvatarFallback>
    </Avatar>
  );
}
