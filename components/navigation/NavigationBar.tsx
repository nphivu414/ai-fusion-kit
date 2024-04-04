import React from "react";
import { cookies } from "next/headers";
import { Menu } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

import { AccountDropdownMenu } from "../modules/profile/AccountDropdownMenu";
import { ThemeToggle } from "../theme";
import { buttonVariants } from "../ui/Button";
import { AppLogo } from "../ui/common/AppLogo";
import { NavigationMainMenu } from "./NavigationMainMenu";

export const NavigationBar = async () => {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const user = await getCurrentUser(supabase);

  return (
    <div className="fixed top-0 z-50 w-full bg-background shadow-md dark:border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <label
            htmlFor="my-drawer"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              }),
              "mr-2 lg:hidden"
            )}
          >
            <Menu />
          </label>
          <div className="shrink-0 md:mr-6">
            <AppLogo />
          </div>
          <NavigationMainMenu />
        </div>
        <div>
          <div className="flex items-center">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div>
              <AccountDropdownMenu userEmail={user?.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
