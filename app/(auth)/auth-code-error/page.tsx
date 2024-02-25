import { Metadata } from "next";

import { Heading3 } from "@/components/ui/typography/Heading3";

export const metadata: Metadata = {
  title: "Error",
  description: "Failed to sign in",
};

export default async function AuthCodeError() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Heading3>Error</Heading3>
        <p className="text-sm text-muted-foreground">Failed to sign in</p>
      </div>
    </>
  );
}
