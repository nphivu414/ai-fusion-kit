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

export function PresencePenaltySelector() {
  const { control, formState, getValues } = useFormContext<ChatParams>()

  return (
    <div className="grid gap-2 pt-4">
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <SliderField
            name="presencePenalty"
            label="Topic Relevance"
            defaultValue={getValues("presencePenalty")}
            min={-2}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            control={control}
            formState={formState}
            aria-label="Topic Relevance"
          />
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="hidden w-[260px] text-sm lg:block"
          side="left"
        >
          <p>
            This nudges the AI to include specific topics or words in its responses. Use a higher value like 1.2 to make sure it talks about certain things, or a lower value like 0.8 for more freedom in topic choice.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
