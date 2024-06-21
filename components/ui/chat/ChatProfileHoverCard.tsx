import React from "react";
import { CalendarDays, Globe } from "lucide-react";

import { Profile } from "@/lib/db";
import { cn } from "@/lib/utils";

import { Button } from "../Button";
import { UserAvatar } from "../common/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { Subtle } from "../typography";
import { ChatBubbleProps } from "./ChatBubble";

type ProfileHoverCardProps = {
  direction?: ChatBubbleProps["direction"];
  profile: Profile;
  joinedDate?: string;
  children: React.ReactNode & React.ReactNode[];
};

export const ChatProfileHoverCard = React.memo(function ChatProfileHoverCard({
  direction,
  profile,
  joinedDate,
  children,
}: ProfileHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn("p-0 text-foreground", {
            "text-white": direction === "end",
          })}
        >
          {children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-50 max-w-80">
        <div className="flex justify-between space-x-4">
          <UserAvatar
            username={profile.username}
            avatarUrl={profile.avatar_url}
          />
          <div className="space-y-1">
            <div className="flex items-center">
              <h4 className="text-sm font-semibold">{children}</h4>
              {profile.full_name ? (
                <span>
                  <Subtle className="ml-1 text-xs">
                    ({profile.full_name})
                  </Subtle>
                </span>
              ) : null}
            </div>
            {profile.website ? (
              <div className="flex items-center pt-2">
                <Globe className="mr-2 size-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {profile.website}
                  </a>
                </span>
              </div>
            ) : null}
            {joinedDate ? (
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 size-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Joined on {new Date(joinedDate).toLocaleDateString()}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
});
