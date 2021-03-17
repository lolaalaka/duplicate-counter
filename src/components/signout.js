import { useAuth } from "../lib/auth";

export default function Signout() {
  const { signOut } = useAuth();
  return (
    <button onClick={signOut} className="signoutbtn">
      Signout
    </button>
  );
}
