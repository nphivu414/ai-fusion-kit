"use client"

import React from "react"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { InputField } from "@/components/ui/form/form-fields"
import { Loader } from "lucide-react"
import Link from "next/link"
import { credentialAuthSchema } from "./schema"
import { SocialLoginOptions } from "./SocialLoginOptions"
import { createClient } from "@/lib/supabase/client"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof credentialAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const supabase = createClient()
  const {
    register,
    formState,
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(credentialAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const fieldProps = { register, formState };

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })


    if (signInResult?.error) {
      setIsLoading(false)
      return toast({
        title: "Error",
        description: "Your email or password is incorrect. Please try again.",
        variant: "destructive",
      })
    }
    
    window.location.href = '/apps/chat'
  }

  return (
    <div className={cn("grid gap-6 rounded-lg p-4 backdrop-blur-3xl lg:rounded-none lg:p-0 lg:backdrop-blur-none", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button disabled={isLoading} className="mt-2">
            {isLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialLoginOptions />
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {`Don't have an account yet?`}
        </span>
        <Link href="/signup" className="text-primary">
          Sign Up
        </Link>
      </div>
    </div>
  )
}