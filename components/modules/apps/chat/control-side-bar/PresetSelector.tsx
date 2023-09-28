"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

import { AICharacter, ChatParams } from "../types"
import { useFormContext } from "react-hook-form"
import { UseChatHelpers } from "ai/react"
import { buildChatRequestParams } from "../utils"

type PresetSelectorProps = PopoverProps & {
  presets: AICharacter[]
} & Pick<UseChatHelpers, 'append' | 'setMessages'>

export function PresetSelector({ presets, append, setMessages, ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<AICharacter>()
  const { reset, setValue } = useFormContext<ChatParams>()

  const handleChangeSystemPropmpt = (preset: AICharacter) => {
    const chatRequestParams = buildChatRequestParams(preset.chatParams)
    setValue('description', preset.description)
    setMessages([
      {
        role: 'system',
        content: preset.description,
        id: 'system-prompt',
      }
    ])
    append({
      role: 'user',
      content: 'Who are you? Please introduce yourself.',
      id: 'change-system-prompt',
    }, {
      options: {
        body: chatRequestParams
      }
    })
  }

  const handleSelect = (preset: AICharacter) => {
    return () => {
      setSelectedPreset(preset)
      setOpen(false)
      reset(preset.chatParams)
      handleChangeSystemPropmpt(preset)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedPreset ? selectedPreset.name : "Load an AI Specialist..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandEmpty>No presets found.</CommandEmpty>
          <CommandGroup heading="Preset AI Specialists">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={handleSelect(preset)}
              >
                {preset.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedPreset?.id === preset.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
