"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { Label } from "./Label"

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  label?: string;
  isError?: boolean;
  helperText?: string;
  containerClassName?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, isError, helperText, containerClassName, defaultValue, onValueChange, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue)

  const handleOnValueChange = (value: number[]) => {
    onValueChange?.(value)
    setValue(value)
  }

  return (
    <div
      className={cn(
        `relative grid gap-4`,
        containerClassName
      )}
    >
      {label ? <div className="flex items-center justify-between">
        <Label htmlFor="temperature">{label}</Label>
        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
          {value}
        </span>
      </div> : null}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={handleOnValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
      {helperText ? (
        <p
          className={cn(
            'absolute -bottom-5 text-xs text-stone-500',
            isError && 'text-red-500'
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
