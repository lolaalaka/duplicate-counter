import { useProvider } from "../context";
import { groupBy } from "lodash";
import { firestore } from "../firebase";
const Duplicates = () => {
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

  const values = useProvider();

  console.log(groupBy(values, "selection"));

  return (
    <div>
      {values && (
        <div>
          {Object.entries(groupBy(values, "selection"))
            .filter((entry) => entry[1].length > 1)
            .map((entry, i) => (
              <div key={i}>
                <div className="duplicate">
                  <h3>
                    "{entry[0]}" {"appears"} {entry[1].length} {"x :"}
                  </h3>
                </div>

                {entry[1].map((item) => (
                  <div className="duplicatecounter" key={item.id}>
                    {/* <span>{item.selection}</span> */}
                    <span> in the folder </span>
                    <h4>"{item.ticket}"</h4>
                    <button onClick={() => handleDelete(item.id)}>
                      <i className="fas fa-trash trash-btn"></i>
                    </button>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Duplicates;
