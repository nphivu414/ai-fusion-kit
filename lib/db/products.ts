import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export const getActiveProductsWithPrices = async (
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};
