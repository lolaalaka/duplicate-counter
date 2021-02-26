import { useState, createContext, useContext, useEffect } from "react";
import { firestore } from "../firebase";
const Context = createContext();

const ContextProvider = ({ children }) => {
  const [values, setValues] = useState([]);

  // console.log(values);

  // const see = values.filter((v, i) => {
  //   //return values.map((item) => item.selection).indexOf(v.selection) != i;
  //   return values.map((item) => item.selection);
  // });

  //console.log(see);

  useEffect(() => {
    firestore.collection("tickets").onSnapshot((snap) => {
      let temp = [];
      snap.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));
      setValues(temp);
    });
  }, []);

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useProvider = () => {
  return useContext(Context);
};

export default ContextProvider;
