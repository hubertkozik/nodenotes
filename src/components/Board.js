import React, { useState, useEffect } from "react";
import { use100vh } from "react-div-100vh";
import axios from "axios";
import dotenv from "dotenv";

import "../styles/Board.scss";
import BoardItem from "./BoardItem";

dotenv.config();
console.log(process.env.REACT_APP_SERVER_URL);

function Board({ notes, setNotes, sortBy }) {
  const height = use100vh();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_URL + "/notes/sync",
      params: { sortBy: sortBy },
    }).then(
      (response) => {
        setLoading(false);
        setNotes(response.data);
      },
      (error) => {
        alert(error);
      }
    );
    // eslint-disable-next-line
  }, [sortBy]);

  return (
    <div className="board" style={{ minHeight: height }}>
      {loading && <div className="board__loading">Loading...</div>}
      {loading === false &&
        notes.map((note, index) => {
          return (
            <BoardItem
              title={note.note[note.note.length - 1].title}
              content={note.note[note.note.length - 1].content}
              created={note.note[note.note.length - 1].created}
              modified={note.note[note.note.length - 1].modified}
              id={note._id}
              key={note._id}
              setNotes={setNotes}
              sortBy={sortBy}
            />
          );
        })}
    </div>
  );
}

export default Board;
