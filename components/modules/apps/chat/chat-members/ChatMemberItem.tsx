import Image from "next/image";
import Link from "next/link";
import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/common/UserAvatar";

export const ChatMemberItem = () => {
  return (
    <Link
      className="flex items-center gap-3 rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      href="#"
    >
      <UserAvatar
        className="z-0"
        username="James Smith"
        avatarUrl=""
        email=""
      />
      <div className="flex-1">
        <p>James Smith</p>
        <p className="text-gray-500 dark:text-gray-400">Offline</p>
      </div>
      <Button size="sm" variant="ghost">
        <MoreVerticalIcon className="size-4" />
        <span className="sr-only">More options</span>
      </Button>
    </Link>
  );
};
