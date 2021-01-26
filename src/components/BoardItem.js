import React, { useState, useEffect, useRef } from "react";

import "../styles/BoardItem.scss";

import DeleteNotePopup from "./DeleteNotePopup";
import EditNotePopup from "./EditNotePopup";
import HistoryNotePopup from "./HistoryNotePopup";

function BoardItem({
  title,
  content,
  created,
  modified,
  id,
  setNotes,
  sortBy,
}) {
  const [heightOfElement, setHeightOfElement] = useState(0);
  const boardItemRef = useRef(null);

  const [deleteNotePopup, setDeleteNotePopup] = useState(false);
  const [editNotePopup, setEditNotePopup] = useState(false);
  const [historyNotePopup, setHistoryNotePopup] = useState(false);

  const handleDeleteNotePopupShow = () => {
    setDeleteNotePopup(!deleteNotePopup);
  };

  const handleEditNotePopupShow = () => {
    setEditNotePopup(!editNotePopup);
  };

  const handleHistoryNotePopupShow = () => {
    setHistoryNotePopup(!historyNotePopup);
  };

  useEffect(() => {
    setHeightOfElement(boardItemRef.current.offsetWidth);

    // eslint-disable-next-line
  }, [window.outerWidth, window.outerHeight]);

  return (
    <>
      <div
        className="boardItem"
        ref={boardItemRef}
        style={{ height: heightOfElement }}
      >
        <h3 className="boardItem__title">{title}</h3>
        <div className="boardItem__dates">
          <p>Created: {created}</p>
          <p>Modified: {modified}</p>
        </div>
        <p className="boardItem__content">{content}</p>
        <div className="boardItem__btns">
          <button
            className="boardItem__editBtn"
            onClick={handleEditNotePopupShow}
          >
            edit
          </button>
          <button
            className="boardItem__historyBtn"
            onClick={handleHistoryNotePopupShow}
          >
            history
          </button>
          <button
            className="boardItem__deleteBtn"
            onClick={handleDeleteNotePopupShow}
          >
            delete
          </button>
        </div>
      </div>
      {deleteNotePopup && (
        <DeleteNotePopup
          handleDeleteNotePopupShow={handleDeleteNotePopupShow}
          id={id}
          setNotes={setNotes}
          sortBy={sortBy}
        />
      )}
      {editNotePopup && (
        <EditNotePopup
          handleEditNotePopupShow={handleEditNotePopupShow}
          noteId={id}
          noteTitle={title}
          noteContent={content}
          setNotes={setNotes}
          sortBy={sortBy}
        />
      )}
      {historyNotePopup && (
        <HistoryNotePopup
          handleHistoryNotePopupShow={handleHistoryNotePopupShow}
          noteId={id}
        />
      )}
    </>
  );
}

export default BoardItem;
