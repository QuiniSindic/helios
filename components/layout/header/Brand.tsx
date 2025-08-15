import QuinisindicLogo from '@/components/ui/icons/QuinisindicLogo';
import { NavbarBrand } from '@heroui/react';
import Link from 'next/link';

interface BrandProps {
  href?: string;
  onClick?: () => void;
}

export const Brand = (props: BrandProps) => {
  return (
    <NavbarBrand className="flex items-center justify-center w-full sm:justify-start sm:w-auto">
      <Link href={props.href || '/'} onClick={props.onClick}>
        <QuinisindicLogo />
      </Link>
      <Link href="/">
        <span className="text-lg font-bold hidden sm:inline text-foreground">
          QuiniSindic
        </span>
      </Link>
    </NavbarBrand>
  );
};
