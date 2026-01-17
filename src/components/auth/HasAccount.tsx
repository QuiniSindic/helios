import Link from 'next/link';

interface HasAccountProps {
  isLogin?: boolean;
}

const HasAccount = ({ isLogin }: HasAccountProps) => {
  return isLogin ? (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
      ¿No tienes cuenta?{' '}
      <Link
        href="/sign-up"
        className="font-medium text-secondary hover:text-secondary/80 transition-colors duration-200"
      >
        Regístrate aquí
      </Link>
    </p>
  ) : (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
      ¿Ya tienes cuenta?{' '}
      <Link
        href="/login"
        className="font-medium text-secondary hover:text-secondary/80 transition-colors duration-200"
      >
        Inicia sesión
      </Link>
    </p>
  );
};

export default HasAccount;
