"use client";

import { AuthScreen } from "@/components/auth-screen";
import { useUser } from "@/context/user-context";

export default function Home() {
  const { user } = useUser();

  return user ? <div></div> : <AuthScreen />;
}
