import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { CustomIcon } from '@/components/ui/CustomIcon';
import { SocialLoginButton } from './SocialLoginButton';


export const SocialLoginOptions = () => {
  return (
    <div className='grid gap-2 lg:grid-cols-3'>
      <SocialLoginButton provider="google">
        <CustomIcon.google />
      </SocialLoginButton>
      <SocialLoginButton provider="twitter">
        <Twitter />
      </SocialLoginButton>
      <SocialLoginButton provider="github">
        <Github />
      </SocialLoginButton>
    </div>
  )
}