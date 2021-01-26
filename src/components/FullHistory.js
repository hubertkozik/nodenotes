import React, { useState, useEffect } from "react";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/FullHistory.scss";

import HistoryItem from "./HistoryItem";

function FullHistory() {
  const [fullHistory, setFullHistory] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "/notes/getFullHistory",
    }).then(
      (response) => {
        setFullHistory(response.data);
      },
      (error) => {
        alert(error);
      }
    );
    // eslint-disable-next-line
  }, []);
  const height = use100vh();
  return (
    <div className="fullHistory" style={{ minHeight: height }}>
      <nav className="fullHistory__navbar">
        <Link to="/nodenotes/" className="navbar__logo">
          <span className="navbar__logo--violet">Node</span>
          <span className="navbar__logo--teal">Notes</span>
        </Link>
      </nav>
      <table className="fullHistory__table">
        <thead>
          <tr>
            <th>Version</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Is deleted?</th>
          </tr>
        </thead>
        <tbody>
          {fullHistory &&
            fullHistory.map((oneNote) => {
              return oneNote.note.map((oneVersion) => (
                <HistoryItem
                  title={oneVersion.title}
                  content={oneVersion.content}
                  created={oneVersion.created}
                  modified={oneVersion.modified}
                  version={oneVersion.version}
                  isDeleted={oneNote.isDeleted}
                  key={oneVersion._id}
                />
              ));
            })}
        </tbody>
      </table>
    </div>
  );
}

export default FullHistory;
