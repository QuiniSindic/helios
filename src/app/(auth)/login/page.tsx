'use client';

import FormAuth from '@/src/components/auth/FormAuth';
import SignInWithSocials from '@/src/components/auth/SignInWithSocials';
import SignInWithSocialsDivider from '@/src/components/auth/SignWithSocialsDivider';

const LoginPage = () => {
  return (
    <div className="w-full space-y-4">
      {/* El logo se mueve al layout para que sea consistente en login y sign-up */}
      <SignInWithSocials isLogin={true} />
      <SignInWithSocialsDivider />
      <FormAuth isLogin={true} />
    </div>
  );
};

export default LoginPage;
