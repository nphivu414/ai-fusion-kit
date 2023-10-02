"use client"

import * as React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"
import { SliderField } from "@/components/ui/form/form-fields"
import { useFormContext } from "react-hook-form"
import { ChatParams } from "../types"

export function TopPSelector() {
  const { control, formState, getValues } = useFormContext<ChatParams>()

  return (
    <div className="grid gap-2 pt-4">
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <SliderField
            name="topP"
            label="Focus"
            defaultValue={getValues("topP")}
            min={0}
            max={1}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            control={control}
            formState={formState}
            aria-label="Focus"
          />
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="hidden w-[260px] text-sm lg:block"
          side="left"
        >
          <p>
            It determines the randomness in AI responses. Higher values like 0.8 mean more randomness, while lower values like 0.2 make responses more focused on a single idea or word.
          </p>
          <p>
            We generally recommend altering this or Creativity but not both.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
