import React, { useState } from "react";
import axios from "axios";

import "../styles/EditNotePopup.scss";

function EditNotePopup({
  handleEditNotePopupShow,
  noteId,
  noteTitle,
  noteContent,
  setNotes,
  sortBy,
}) {
  const [title, setTitle] = useState(noteTitle);
  const [content, setContent] = useState(noteContent);

  const handleSubmit = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const year = today.getFullYear();

    const actualDate =
      day +
      "." +
      month +
      "." +
      year +
      " " +
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":" +
      String(today.getSeconds()).padStart(2, "0");

    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_URL + "/notes/update",
      data: {
        id: noteId,
        title: title,
        content: content,
        modified: actualDate,
        sortBy: sortBy,
      },
    }).then(
      (response) => {
        if (response.status === 200) {
          setNotes(response.data);
          handleEditNotePopupShow();
        }
      },
      (error) => {
        alert(error);
      }
    );
  };

  return (
    <div className="editNotePopup">
      <form
        className="editNotePopup__form"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="editNotePopup__title">Edit your note</h3>

        <label htmlFor="title" className="editNotePopup__label">
          Edit title of this note.
        </label>
        <input
          type="text"
          name="title"
          className="editNotePopup__noteTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content" className="editNotePopup__label">
          Edit content of this note.
        </label>

        <textarea
          name="content"
          className="editNotePopup__noteContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <div className="editNotePopup__btns">
          <button
            onClick={handleEditNotePopupShow}
            className="editNotePopup__cancelBtn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="editNotePopup__submitBtn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNotePopup;
