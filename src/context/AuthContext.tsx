'use client';

import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext(props: AuthContextProps) {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
}