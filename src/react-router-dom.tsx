"use client";

import React from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LinkProps = React.PropsWithChildren<
  {
    to: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...rest }, ref) => {
    return (
      <NextLink href={to} legacyBehavior>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </NextLink>
    );
  }
);

Link.displayName = "RouterLink";

export const Outlet: React.FC = () => null;

export const useLocation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams?.toString() ?? "";

  return {
    pathname: pathname ?? "",
    search: searchString ? `?${searchString}` : "",
    hash: "",
    state: null,
    key: "default"
  };
};

export const useNavigate = () => {
  const router = useRouter();
  return (to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    if (options?.replace) {
      router.replace(to, { scroll: options?.scroll });
      return;
    }
    router.push(to, { scroll: options?.scroll });
  };
};

type NavigateProps = {
  to: string;
  replace?: boolean;
};

export const Navigate: React.FC<NavigateProps> = ({ to, replace }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  }, [router, to, replace]);

  return null;
};

export const useParams = <
  TParams extends Record<string, string | undefined> = Record<string, string | undefined>
>() => {
  // Для первых шагов миграции параметры читаем через хуки Next внутри страниц.
  // Этот заглушечный хук нужен только для совместимости типизации.
  return {} as TParams;
};

export const useRoutes = () => {
  throw new Error("useRoutes is not supported in Next.js version of the app.");
};


