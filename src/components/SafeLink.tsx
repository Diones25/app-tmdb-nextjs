"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export default function SafeLink({ href, children, ...rest }: Props) {
  if (!href) {
    return <a {...(rest as object)}>{children}</a>;
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
