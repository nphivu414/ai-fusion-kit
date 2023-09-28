"use client"

import React from "react"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { InputField } from "@/components/ui/form/form-fields"
import { Loader } from "lucide-react"
import { profileSchema } from "./schema"
import { updateProfile } from "./action"
import { ProfileFormValues } from "./type"
import Link from "next/link"

type ProfileFormProps = {
  formValues: ProfileFormValues
} & React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof profileSchema>

export function ProfileForm({ className, formValues, ...props }: ProfileFormProps) {
  const [isPendingUpdate, startUpdate] = React.useTransition()
  const {
    register,
    formState,
    handleSubmit,
    reset
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
  })
  const { toast } = useToast()

  const fieldProps = { register, formState };

  React.useEffect(() => {
    reset(formValues)
  }, [formValues, reset])

  async function onSubmit(data: FormData) {
    startUpdate(async () => {
      try {
        await updateProfile(data)
        toast({
          title: "Success",
          description: "Your profile has been updated.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className={cn("grid gap-2 p-4", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <InputField
              name="username"
              label="Username"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isPendingUpdate}
              {...fieldProps}
            />
          </div>
          <div className="grid gap-1">
            <InputField
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isPendingUpdate}
              {...fieldProps}
            />
          </div>
          <div className="grid gap-1">
            <InputField
              name="website"
              label="Website"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isPendingUpdate}
              {...fieldProps}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:flex lg:justify-end">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mr-2 w-full lg:w-auto"
            )}
          >
            Cancel
          </Link>
          <Button className="w-full lg:w-auto" disabled={isPendingUpdate}>
            {isPendingUpdate && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>          
        </div>
      </form>
    </div>
  )
}