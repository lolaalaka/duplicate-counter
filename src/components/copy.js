import { useProvider } from "../context";
import { useState, useEffect } from "react";
import Currentlist from "./currentlist";
import Duplicates from "./duplicates";

const Copy = () => {
  const values = useProvider();
  //console.log(inputVariable);
  const [currentTicket, setCurrentTicket] = useState();
  const [currentList, setCurrentList] = useState();
  const [duplicateActive, setDuplicatesActive] = useState(false);

  useEffect(() => {
    if (currentTicket) {
      setCurrentList(values.filter((item) => item.ticket === currentTicket));
    }
  }, [currentTicket, values]);

  const handleDuplicates = () => {
    setDuplicatesActive(true);
  };

  return (
    <>
      <div className="folder-container">
        {[...new Set(values.map((item) => item.ticket))].map((item, index) => (
          <button
            key={index}
            className="folderandtext"
            onClick={() => {
              setCurrentTicket(item);
              setDuplicatesActive(false);
            }}
          >
            <i
              className={`fas fa-folder foldericon ${
                currentTicket === item ? "fas fa-folder-open " : null
              }`}
            ></i>
            <p className="foldertext"> {item}</p>
          </button>
        ))}
        <button
          className={`analysis-btn ${
            duplicateActive === true ? "analysis-btnopen" : null
          }`}
          onClick={handleDuplicates}
        >
          <i className="fas fa-clone"></i>
          <p className="replicateparagraph">see duplicates here</p>
        </button>
      </div>

      {/* currentlist and duplicates are imported */}

      {duplicateActive ? (
        <Duplicates />
      ) : (
        <Currentlist currentList={currentList} />
      )}
    </>
  );
};

export default Copy;
