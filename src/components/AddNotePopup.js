import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

import "../styles/AddNotePopup.scss";

dotenv.config();

function AddNotePopup({ handleAddNotePopupShow, setNotes, sortBy }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title && content) {
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
        url: process.env.REACT_APP_SERVER_URL + "/notes/new",
        data: {
          title: title,
          content: content,
          created: actualDate,
          sortBy: sortBy,
        },
      }).then(
        (response) => {
          if (response.status === 200) {
            setNotes(response.data);
            handleAddNotePopupShow();
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  };

  return (
    <div className="addNotePopup">
      <form className="addNotePopup__form" onSubmit={(e) => e.preventDefault()}>
        <h3 className="addNotePopup__title">Add a new note</h3>

        <label htmlFor="title" className="addNotePopup__label">
          Set title for this note.
        </label>
        <input
          type="text"
          name="title"
          className="addNotePopup__noteTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content" className="addNotePopup__label">
          Type something.
        </label>

        <textarea
          name="content"
          className="addNotePopup__noteContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <div className="addNotePopup__btns">
          <button
            onClick={handleAddNotePopupShow}
            className="addNotePopup__cancelBtn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="addNotePopup__submitBtn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNotePopup;
