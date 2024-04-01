import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

import { Database } from ".";
import { getCurrentUser } from "../session";

const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: "[DB] Profile",
  },
});

export const getCurrentProfile = async (supabase: SupabaseClient<Database>) => {
  log.info(`${getCurrentProfile.name} called`);

  const user = await getCurrentUser(supabase);

  if (!user) return null;

  const { data, error, status } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", user.id)
    .single();

  if (error && status !== 406) {
    log.error(getCurrentProfile.name, { error, status });
    return null;
  }

  log.info(`${getCurrentProfile.name} fetched successfully`, { data });

  return data;
};
