import { Profile } from "@/lib/db"
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar"
import { User } from "@supabase/supabase-js"
import { AvatarProps } from "@radix-ui/react-avatar"

type UserAvatarProps = {
  username: Profile['username'],
  avatarUrl: Profile['avatar_url'],
  email: User['email'],
} & AvatarProps

export const UserAvatar = ({ avatarUrl, username, email, ...rest }: UserAvatarProps) => {
  const nameLabel = username || email || ''
  const firstLetter = nameLabel.charAt(0).toUpperCase()
  return (
    <Avatar {...rest}>
      {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
      <AvatarFallback>{firstLetter}</AvatarFallback>
    </Avatar>
  )
}
