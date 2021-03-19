import { useAuth } from "../lib/auth";
import Authenticate from "../components/signin";

const Layout = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Authenticate />;
  return <> {children}</>;
};

export default Layout;
