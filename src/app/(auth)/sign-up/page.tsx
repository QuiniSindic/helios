'use client';

import FormAuth from '@/src/components/auth/FormAuth';
import SignInWithSocials from '@/src/components/auth/SignInWithSocials';
import SignInWithSocialsDivider from '@/src/components/auth/SignWithSocialsDivider';

const SignUpPage = () => {
  return (
    <div className="w-full space-y-4">
      <SignInWithSocials isLogin={false} />
      <SignInWithSocialsDivider />
      <FormAuth isLogin={false} />
    </div>
  );
};

export default SignUpPage;
