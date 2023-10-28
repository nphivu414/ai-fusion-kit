import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { App, Database } from "."
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";
import { unstable_cache } from "next/cache";
import { CACHE_KEYS } from "../cache";

const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: '[DB] Apps',
  }
});

export const getApps = async (supabase: SupabaseClient<Database>) => {
  log.info(`${getApps.name} called`);
  const { data, error, status } = await supabase
    .from('apps')
    .select('*')

  if (error && status !== 406) {
    log.error(getApps.name, { error, status });
    return null
  }
  log.info(`${getApps.name} fetched successfully`, { data });

  return data
}

export const getAppBySlug = unstable_cache(async (supabase: SupabaseClient<Database>, slug: App['slug']) => {
  log.info(`${getAppBySlug.name} called`, { slug });
  const { data, error, status } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error && status !== 406) {
    log.error(getAppBySlug.name, { error, status });
    return null
  }

  log.info(`${getAppBySlug.name} fetched successfully`, { data });
  return data
},
[CACHE_KEYS.APPS],
{
  revalidate: false,
})