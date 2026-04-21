import { AuthScreen } from "@/components/auth-screen";

export default function Home() {
  const user = null;

  return user ? <div></div> : <AuthScreen />;
}
