import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "@supabase/supabase-js";

import { Profile } from "@/lib/db";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

type UserAvatarProps = {
  username: Profile["username"];
  avatarUrl?: Profile["avatar_url"];
  email?: User["email"];
  isOnline?: boolean;
} & AvatarProps;

export const UserAvatar = ({
  avatarUrl,
  username,
  email,
  isOnline,
  ...rest
}: UserAvatarProps) => {
  const nameLabel = username || email || "";
  const fallback = nameLabel.slice(0, 1).toUpperCase();
  return (
    <Avatar {...rest}>
      {isOnline !== undefined && (
        <span
          className={cn(
            "borde absolute -right-1 -top-0 flex size-4 rounded-full",
            {
              "bg-green-500": isOnline,
              "bg-gray-400": !isOnline,
            }
          )}
        />
      )}
      {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
