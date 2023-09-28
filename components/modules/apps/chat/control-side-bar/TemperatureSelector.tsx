"use client"

import * as React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"
import { useFormContext } from "react-hook-form"
import { ChatParams } from "../types"
import { SliderField } from "@/components/ui/form/form-fields/SliderField"

export function TemperatureSelector() {
  const { control, formState, getValues } = useFormContext<ChatParams>()

  return (
    <div className="grid gap-2 pt-4">
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <SliderField
            name="temperature"
            label="Creativity"
            defaultValue={getValues("temperature")}
            min={0}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            control={control}
            formState={formState}
            aria-label="Creativity"
          />
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="hidden w-[260px] text-sm lg:block"
          side="left"
        >
          {`Think of it as the AI's "creativity knob." A higher value like 0.8 makes responses more creative and unpredictable, while a lower value like 0.2 makes responses more focused and consistent. Adjust it to control how imaginative or precise the AI's answers are.`}
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
