"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import { SliderField } from "@/components/ui/form/form-fields";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

import { ChatParams } from "../types";

export function MaxLengthSelector() {
  const { control, formState, getValues } = useFormContext<ChatParams>();

  return (
    <div className="grid gap-2 pt-4">
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <SliderField
            name="maxTokens"
            label="Length Limit"
            defaultValue={getValues("maxTokens")}
            min={0}
            max={1000}
            step={10}
            className="[&_[role=slider]]:size-4"
            control={control}
            formState={formState}
            aria-label="Length Limit"
          />
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="hidden w-[260px] text-sm lg:block"
          side="left"
        >
          {`This sets the maximum length of the AI's reply. Use it to limit how long the AI's response should be, helpful to keep responses concise.`}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
