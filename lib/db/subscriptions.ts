import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export async function getSubscription(supabase: SupabaseClient<Database>) {
  try {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
