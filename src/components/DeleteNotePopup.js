import React from "react";
import axios from "axios";

import "../styles/DeleteNotePopup.scss";

function DeleteNotePopup({ handleDeleteNotePopupShow, id, setNotes, sortBy }) {
  const handleSubmit = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_URL + "/notes/delete",
      data: { id: id, sortBy: sortBy },
    }).then(
      (response) => {
        if (response.status === 200) {
          setNotes(response.data);
          handleDeleteNotePopupShow();
        }
      },
      (error) => {
        alert(error);
      }
    );
  };
  return (
    <div className="deleteNotePopup">
      <div className="deleteNotePopup__form">
        <h3 className="deleteNotePopup__title">
          Do you really want to delete your note?
        </h3>

        <div className="deleteNotePopup__btns">
          <button
            onClick={handleDeleteNotePopupShow}
            className="deleteNotePopup__cancelBtn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="deleteNotePopup__submitBtn"
            onClick={handleSubmit}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteNotePopup;
