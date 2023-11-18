import { cookies } from "next/headers";

import { getActiveProductsWithPrices } from "@/lib/db/products";
import { getSubscription } from "@/lib/db/subscriptions";
import { getCurrentSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { MainLayout } from "@/components/ui/common/MainLayout";
import Pricing from "@/components/modules/subscription/Pricing";

export default async function PricingPage() {
  const supabase = createClient(cookies());
  const [session, products, subscription] = await Promise.all([
    getCurrentSession(supabase),
    getActiveProductsWithPrices(supabase),
    getSubscription(supabase),
  ]);

  return (
    <MainLayout>
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </MainLayout>
  );
}
