import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export const getTokenUsage = async (supabase: SupabaseClient<Database>) => {
  const { data: existingRecord } = await supabase
    .from("token_usage")
    .select("*")
    .maybeSingle()
    .throwOnError();

  return existingRecord;
};
