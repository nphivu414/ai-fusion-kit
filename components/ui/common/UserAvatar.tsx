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
    <div className="relative">
      <Avatar {...rest}>
        {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute -right-1 -top-0 flex size-4 rounded-full border",
            {
              "bg-green-500": isOnline,
              "bg-gray-400": !isOnline,
            }
          )}
        />
      )}
    </div>
  );
};
