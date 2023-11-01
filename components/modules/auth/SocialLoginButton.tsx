import { Button, ButtonProps } from '@/components/ui/Button'
import { useToast } from '@/components/ui/use-toast'
import { getURL } from '@/config/site'
import { createClient } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js'
import { Loader } from 'lucide-react'
import React from 'react'

type SocialLoginButtonProps = ButtonProps & {
  provider: Provider
}

export const SocialLoginButton = ({ provider, children, ...rest }: SocialLoginButtonProps) => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const signIn = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${getURL()}api/auth/callback`
      }
    })

    if (error) {
      setIsLoading(false)
      return toast({
        title: "Error",
        description: "Your email or password is incorrect. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant="outline" type="button" disabled={isLoading} onClick={signIn} {...rest}>
      { isLoading ? <Loader className='animate-spin'/> : children }
    </Button>
  )
}