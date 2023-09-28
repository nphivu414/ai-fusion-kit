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

export function FrequencyPenaltySelector() {
  const { control, formState, getValues } = useFormContext<ChatParams>()

  return (
    <div className="grid gap-2 pt-4">
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <SliderField
            name="frequencyPenalty"
            label="Word Variation"
            defaultValue={getValues("frequencyPenalty")}
            min={-2}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            control={control}
            formState={formState}
            aria-label="Word Variation"
          />
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="hidden w-[260px] text-sm lg:block"
          side="left"
        >
          <p>
            Adjust this to encourage the AI to use less common words. A higher value like 1.2 makes it prefer unique words, while a lower value like 0.8 lets it use common words more often.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
