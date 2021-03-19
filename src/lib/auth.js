import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const value = useAuthProvider();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => {
  return useContext(Context);
};

const parseUser = (user) => ({
  uid: user.uid,
  email: user.email,
  token: user.za,
});

function useAuthProvider() {
  const [user, setUser] = useState();

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(parseUser(user));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signUp = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut();

  return { signIn, signUp, signOut, user };
}

export default AuthProvider;
