import { useState, createContext, useContext, useEffect } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../lib/auth";
import Authenticate from "../components/signin";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [values, setValues] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let temp = [];
    let modifiedIndex;

    firestore
      .collection("tickets")
      .where("owner", "==", user.uid)
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          const { doc, type } = change;

          switch (type) {
            case "added":
              temp.push({ id: doc.id, ...doc.data() });
              break;
            case "modified":
              modifiedIndex = temp.findIndex((input) => input.id === doc.id);
              temp.splice(modifiedIndex, 1);
              temp = [{ id: doc.id, ...doc.data() }, ...temp];
              break;
            case "removed":
          }
        });
        setValues(temp);
      });
  }, []);

  useEffect(() => {
    if (values.length) {
      console.log(values.map((value) => value.owner));
    }
  }, [values]);

  if (!user) return <Authenticate />;

  return <Context.Provider value={values}>{children}</Context.Provider>;

  // useEffect(() => {
  //   firestore.collection("tickets").onSnapshot((snap) => {
  //     let temp = [];
  //     snap.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));
  //     setValues(temp);
  //   });

  //   let temp = [];

  //   if (user) {
  //     firestore
  //       .collection("tickets")
  //       .where("owner", "==", user.uid)
  //       .get()
  //       .then((res) => {
  //         res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
  //         setValues(temp);
  //       });
  //   }
  // }, [user]);
};

export const useProvider = () => {
  return useContext(Context);
};

export default ContextProvider;
