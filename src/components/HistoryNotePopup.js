import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/HistoryNotePopup.scss";

import HistoryItem from "./HistoryItem";

function HistoryNotePopup({ handleHistoryNotePopupShow, noteId }) {
  const [historyOfNote, setHistoryOfNote] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "/notes/getHistory",
      params: { id: noteId },
    }).then(
      (response) => {
        setHistoryOfNote(response.data);
      },
      (error) => {
        alert(error);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div className="historyNotePopup">
      <div className="historyNotePopup__form">
        <button
          onClick={handleHistoryNotePopupShow}
          className="historyNotePopup__cancelBtn"
        >
          X
        </button>
        <h3 className="historyNotePopup__title">History of this note</h3>
        <table className="historyNotePopup__table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Title</th>
              <th>Content</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            {historyOfNote &&
              historyOfNote.note.map((oneNote) => (
                <HistoryItem
                  title={oneNote.title}
                  content={oneNote.content}
                  created={oneNote.created}
                  modified={oneNote.modified}
                  version={oneNote.version}
                  key={oneNote._id}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryNotePopup;
