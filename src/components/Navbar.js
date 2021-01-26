import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import "../styles/Navbar.scss";

function Navbar({
  handleAddNotePopupShow,
  handleMenuClick,
  menuClick,
  sortBy,
  setSortBy,
  setNotes,
}) {
  return (
    <nav
      className={
        menuClick ? `navbar navbar--menuOpen` : `navbar navbar--menuClose`
      }
    >
      <div className="navbar__leftBtns">
        <select
          className="navbar__sortBtn"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="titleAsc">Sort by title of note ▼</option>
          <option value="titleDesc">Sort by title of note ▲</option>
          <option value="createdAsc">Sort by date of created ▼</option>
          <option value="createdDesc">Sort by date of created ▲</option>
          <option value="modifiedAsc">Sort by date of modify ▼</option>
          <option value="modifiedDesc">Sort by date of modify ▲</option>
        </select>
        <Link className="navbar__historyBtn" to="/nodenotes/fullHistory">
          Full&nbsp;History
        </Link>
      </div>

      <Link to="/nodenotes/" className="navbar__logo">
        <span className="navbar__logo--violet">Node</span>
        <span className="navbar__logo--teal">Notes</span>
      </Link>

      <button className="navbar__button" onClick={handleAddNotePopupShow}>
        Add a note
      </button>

      {menuClick ? (
        <CloseIcon
          className="navbar__menuIcon navbar__menuIcon--white"
          onClick={handleMenuClick}
        />
      ) : (
        <MenuIcon className="navbar__menuIcon" onClick={handleMenuClick} />
      )}
    </nav>
  );
}

export default Navbar;
