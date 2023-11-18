import { env } from "@/env.mjs";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../db/database.types";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
export const supabaseAdmin = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_SUPABASE_SERVICE_ROLE
);
