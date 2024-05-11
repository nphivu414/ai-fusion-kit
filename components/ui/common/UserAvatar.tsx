import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "@supabase/supabase-js";

import { Profile } from "@/lib/db";

import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

type UserAvatarProps = {
  username: Profile["username"];
  avatarUrl?: Profile["avatar_url"];
  email?: User["email"];
} & AvatarProps;

export const UserAvatar = ({
  avatarUrl,
  username,
  email,
  ...rest
}: UserAvatarProps) => {
  const nameLabel = username || email || "";
  const fallback = nameLabel.slice(0, 1).toUpperCase();
  return (
    <Avatar {...rest}>
      {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
