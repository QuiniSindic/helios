import AppleIcon from '@/components/ui/icons/AppleIcon';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import { handleGoogleAuth } from '@/services/auth.service';

interface SignInWithSocialsProps {
  isLogin?: boolean;
}

const SignInWithSocials = ({ isLogin }: SignInWithSocialsProps) => {
  return isLogin ? (
    <div className="flex flex-col space-y-4 justify-center">
      <button
        onClick={() => handleGoogleAuth()}
        className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        <GoogleIcon className="h-6 w-6" />
        <span>Iniciar sesión con Google</span>
      </button>
      <button
        // onClick={handleAppleSubmit}
        className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        <AppleIcon className="h-6 w-6 text-black" />
        <span>Iniciar sesión con Apple</span>
      </button>
    </div>
  ) : (
    <div className="flex flex-col space-y-4 justify-center">
      <button
        onClick={() => handleGoogleAuth()}
        className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        <GoogleIcon className="h-6 w-6" />
        <span>Registrarse con Google</span>
      </button>
      <button
        // onClick={handleAppleSubmit}
        className="flex items-center justify-center gap-4 px-6 py-3 border rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        <AppleIcon className="h-6 w-6 text-black" />
        <span>Registrarse con Apple</span>
      </button>
    </div>
  );
};

export default SignInWithSocials;
