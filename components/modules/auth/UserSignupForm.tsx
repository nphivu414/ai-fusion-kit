"use client"

import React from "react"
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { InputField } from "@/components/ui/form/form-fields"
import { Loader } from "lucide-react"
import { registerProfileSchema } from "./schema"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type UserSignupFormProps = React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof registerProfileSchema>

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
  const supabase = createClient()
  const { replace } = useRouter()
  const {
    register,
    formState,
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(registerProfileSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const fieldProps = { register, formState };

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signUpResult = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        }
      }
    })

    if (signUpResult?.error) {
      setIsLoading(false)
      return toast({
        title: "Error",
        description: "There was an error signing up. Please try again.",
        variant: "destructive",
      })
    }
    
    replace("/apps/chat")
  }

  return (
    <div className={cn("grid gap-6 rounded-lg p-4 backdrop-blur-3xl lg:rounded-none lg:p-0 lg:backdrop-blur-none", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <InputField
              name="email"
              label="Email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
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
              disabled={isLoading}
              {...fieldProps}
            />
          </div>
          <div className="grid gap-1">
            <InputField
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...fieldProps}
            />
          </div>
          <div className="grid gap-1">
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...fieldProps}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 text-muted-foreground">
            Already have an account?
        </span>
        <Link href="/signin" className="text-primary">
          Sign in
        </Link>
      </div>
    </div>
  )
}