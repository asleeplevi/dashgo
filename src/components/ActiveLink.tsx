import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  exact?: boolean;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  exact = false,
  ...rest
}) => {
  const { asPath } = useRouter();
  const isActive = verifyCurrentPathIsActive();

  function verifyCurrentPathIsActive() {
    if (exact) return asPath === rest.href || asPath === rest.as;

    return (
      asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as))
    );
  }

  return (
    <Link {...rest}>
      {cloneElement(children as ReactElement, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
};
