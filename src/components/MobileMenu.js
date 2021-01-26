import React from "react";
import { Link } from "react-router-dom";
import { use100vh } from "react-div-100vh";

import "../styles/MobileMenu.scss";

function MobileMenu({
  handleAddNotePopupShow,
  setMenuClick,
  sortBy,
  setSortBy,
}) {
  const height = use100vh();
  return (
    <div className="mobileMenu" style={{ height: height }}>
      <select
        className="mobileMenu__sortBtn"
        onChange={(e) => {
          setSortBy(e.target.value);
          setMenuClick(false);
        }}
        value={sortBy}
      >
        <option value="titleAsc">Sort by title of note ▼</option>
        <option value="titleDesc">Sort by title of note ▲</option>
        <option value="createdAsc">Sort by date of created ▼</option>
        <option value="createdDesc">Sort by date of created ▲</option>
        <option value="modifiedAsc">Sort by date of modify ▼</option>
        <option value="modifiedDesc">Sort by date of modify ▲</option>
      </select>
      <Link
        className="mobileMenu__historyBtn"
        to="/nodenotes/fullHistory"
        onClick={() => {
          setMenuClick(false);
        }}
      >
        Full&nbsp;History
      </Link>
      <button className="mobileMenu__button" onClick={handleAddNotePopupShow}>
        Add a note
      </button>
    </div>
  );
}

export default MobileMenu;
