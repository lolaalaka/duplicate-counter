import { firestore } from "../firebase";

const Currentlist = ({ currentList }) => {
  const handleDelete = (id) => {
    //e.preventDefault();
    firestore
      .collection("tickets")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };

  return (
    <div className="container">
      {currentList &&
        currentList.map((item, index) => (
          <div className="copy" key={index}>
            <p>{item.selection}</p>
            <button onClick={() => handleDelete(item.id)}>
              {" "}
              <i className="fas fa-trash trash-btn"></i>
            </button>
          </div>
        ))}
    </div>
  );
};

export default Currentlist;
