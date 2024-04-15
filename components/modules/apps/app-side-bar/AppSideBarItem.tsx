import React from "react";
import Link from "next/link";

import { App } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

type AppSideBarItemProps = Pick<
  App,
  "name" | "slug" | "description" | "logo_url"
>;

export const AppSideBarItem = ({
  name,
  slug,
  description,
  logo_url: logoUrl,
}: AppSideBarItemProps) => {
  return (
    <li className="px-2 py-1 lg:min-w-[319px]">
      <Link className="h-16 w-full" href={slug || ""}>
        <div className="flex flex-row items-center rounded-lg p-2 transition-colors hover:bg-background/30">
          <div className="flex flex-col">
            <Avatar>
              {logoUrl ? (
                <AvatarImage src={logoUrl} className="w-12" alt={name} />
              ) : null}
              <AvatarFallback>
                <div className="size-12 bg-card-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col px-4">
            <p className="font-bold">{name}</p>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
};
