import { AuthScreen } from "@/components/auth-screen";

export default function Home() {
  const user = null;

  return <div>{user ? <div></div> : <AuthScreen />}</div>;
}
