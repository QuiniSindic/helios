'use client';

import FormAuth from '@/components/auth/FormAuth';
import SignInWithSocials from '@/components/auth/SignInWithSocials';
import SignInWithSocialsDivider from '@/components/auth/SignWithSocialsDivider';
import QuinisindicLogo from '@/components/ui/icons/QuinisindicLogo';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className=" flex flex-1 items-center justify-center bg-white dark:bg-[#272727]">
      <div className="max-w-md w-full space-y-4 p-8 bg-white dark:bg-[#272727] rounded-lg g my-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <QuinisindicLogo className="h-24 w-auto mx-auto" />
          </Link>
        </div>

        <SignInWithSocials isLogin={true} />

        <SignInWithSocialsDivider />

        <FormAuth isLogin={true} />
      </div>
    </div>
  );
};

export default LoginPage;
