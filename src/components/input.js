import { useProvider } from "../context";
import { firestore } from "../firebase";

const Input = () => {
  const values = useProvider("");

  const submitEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    firestore
      .collection("tickets")
      .add(data)
      .then((id) => e.target.reset());
  };

  return (
    <>
      <div className ="nb">
       <p> *create a uniquely named folder to store your selections, a folder name
        cannot appear more than once* </p>
      </div>
      <form onSubmit={submitEntry}>
        <input
          type="text"
          name="selection"
          placeholder="type in your selections"
          className="inputbox"
        />{" "}
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
        </datalist>{" "}
        <button type="submit" className=" plus-btn">
          {" "}
          <i className="fas fa-arrow-circle-down"></i>
        </button>
      </form>
    </>
  );
};

export default Input;
