import { useState, createContext, useContext, useEffect } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../lib/auth";
import Authenticate from "../components/signin";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [values, setValues] = useState([]);
   const { user } = useAuth();


  useEffect(() => {
    // firestore.collection("tickets").onSnapshot((snap) => {
    //   let temp = [];
    //   snap.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));
    //   setValues(temp);
    // });

    let temp = [];

    if (user) {
      firestore
        .collection("tickets")
        .where("owner", "==", user.uid)
        .get()
        .then((res) => {
          res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
          setValues(temp);
        });
    }
  }, [user]);

  useEffect(() => {
    if (values.length) {
      console.clear();
      console.log(values.map((value) => value.owner));
    }
  }, [values]);

   if (!user) return <Authenticate />;

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useProvider = () => {
  return useContext(Context);
};

export default ContextProvider;
