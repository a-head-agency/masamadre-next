"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

export type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement> & {
    activeClassName?: string;
    inactiveClassName?: string;
    exact?: boolean;
  };

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { activeClassName, inactiveClassName, className, href, exact, ...props },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      setIsActive(
        exact
          ? pathname === href.toString()
          : pathname.startsWith(href.toString())
      );
    }, [exact, href, pathname]);

    return (
      <Link
        className={`${className} ${
          isActive ? activeClassName : inactiveClassName
        }`}
        href={href}
        ref={ref}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;
