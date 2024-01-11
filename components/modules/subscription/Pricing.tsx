"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";

import { Price, Product, Subscription } from "@/lib/db";
import { getStripe } from "@/lib/stripe/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({
  session,
  user,
  products,
  subscription,
}: Props) {
  console.log("🚀 ~ subscription:", subscription);
  const intervals = Array.from(
    new Set(
      products.flatMap(
        (product) => product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/signin");
    }
    if (subscription) {
      return router.push("/profile");
    }
    try {
      const res = await fetch("/api/payment/checkout-session", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ price }),
      });

      const { sessionId } = (await res.json()) as { sessionId: string };

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col"></div>
          <p className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-primary underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  if (products.length === 1)
    return (
      <section>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative mt-12 flex self-center rounded-lg border">
              <div className="border-accering-primary divide-y divide-border rounded-lg border shadow-sm">
                <div className="m-1 whitespace-nowrap rounded-md border p-6 py-2 text-2xl font-medium shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0,
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="divide-y divide-border rounded-lg shadow-sm"
                  >
                    <div className="p-6">
                      <p>
                        <span className="white text-5xl font-extrabold">
                          {priceString}
                        </span>
                        <span className="text-base font-medium ">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        {price.description}
                      </p>
                      <Button
                        type="button"
                        isLoading={priceIdLoading === price.id}
                        onClick={() => handleCheckout(price)}
                        className="hover mt-12 block w-full rounded-md py-2 text-center text-sm font-semibold "
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? "Manage"
                          : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative mt-6 flex self-center rounded-lg border p-0.5 sm:mt-8">
            {intervals.includes("month") && (
              <button
                onClick={() => setBillingInterval("month")}
                type="button"
                className={`${
                  billingInterval === "month"
                    ? "relative w-1/2 border bg-card shadow-sm"
                    : "relative ml-0.5 w-1/2 border border-transparent"
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes("year") && (
              <button
                onClick={() => setBillingInterval("year")}
                type="button"
                className={`${
                  billingInterval === "year"
                    ? "relative w-1/2 border bg-card shadow-sm"
                    : "relative ml-0.5 w-1/2 border border-transparent"
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  "divide-y divide-border rounded-lg bg-card shadow-sm",
                  {
                    "border border-accering-primary": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === "Freelancer",
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="white text-5xl font-extrabold">
                      {priceString}
                    </span>
                    <span className="text-base font-medium ">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={!session}
                    isLoading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="mt-8 block w-full rounded-md py-2 text-center text-sm font-semibold"
                  >
                    {subscription ? "Manage" : "Subscribe"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
