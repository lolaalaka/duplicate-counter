import { useState } from "react";
import { useProvider } from "../context";
import { firestore } from "../firebase";
import { useAuth } from "../lib/auth";

const Input = () => {
  const values = useProvider("");

  const { user } = useAuth();
  const [inputValue, setinputValue] = useState("");

  const inputHandler = (e) => {
    setinputValue(e.target.value);
  };

  const inputHandler2 = (e) => {
    setinputValue(`${inputValue} ${e.target.value}`);
  };

  const submitEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    firestore
      .collection("tickets")
      .add({ ...data, owner: user.uid })
      .then((id) => e.target.reset());
  };

  return (
    <form onSubmit={submitEntry}>
      <input
        type="text"
        name="selection"
        value={inputValue}
        onChange={inputHandler}
        placeholder="type in your selections"
        className="inputbox"
      />
      <select name="options" onChange={inputHandler2} className="dropdown">
        <option value="Points">Points</option>
        <option value="Assists">Assists</option>
        <option value="Rebounds">Rebounds</option>
        <hr></hr>
        <option value="Over">Over</option>
        <option value="Under">Under</option>
      </select>
      <label htmlFor="item"></label>
      <input
        list="items"
        name="ticket"
        id="item"
        className="datalist-box"
        placeholder="create unique folder"
      />
      <datalist id="items">
        {[...new Set(values.map((x) => x.ticket))].map((item, index) => (
          <option key={index}> {item} </option>
        ))}
      </datalist>
      <button type="submit" className=" plus-btn">
        <i className="fas fa-arrow-circle-down"></i>
      </button>
    </form>
  );
};

export default Input;
