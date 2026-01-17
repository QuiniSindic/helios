'use client';

import FormAuth from '@/src/components/auth/FormAuth';
import SignInWithSocials from '@/src/components/auth/SignInWithSocials';
import SignInWithSocialsDivider from '@/src/components/auth/SignWithSocialsDivider';
import QuinisindicLogo from '@/src/components/ui/icons/QuinisindicLogo';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-white dark:bg-[#272727]">
      <div className="max-w-md w-full space-y-4 p-8 bg-white dark:bg-[#272727] rounded-lg g my-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <QuinisindicLogo className="h-24 w-auto mx-auto" />
          </Link>
        </div>

        <SignInWithSocials isLogin={false} />

        <SignInWithSocialsDivider />

        <FormAuth isLogin={false} />
      </div>
    </div>
  );
};

export default SignUpPage;
