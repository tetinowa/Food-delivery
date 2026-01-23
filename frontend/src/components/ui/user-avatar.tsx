"use client";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  className?: string;
};

export function UserAvatar({ name, className }: UserAvatarProps) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium size-9",
        className
      )}
    >
      {initial}
    </div>
  );
}
