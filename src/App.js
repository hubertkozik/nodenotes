import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Board from "./components/Board";
import Navbar from "./components/Navbar";
import AddNotePopup from "./components/AddNotePopup";
import FullHistory from "./components/FullHistory";
import MobileMenu from "./components/MobileMenu";

function App() {
  const [addNotePopup, setAddNotePopup] = useState(false);
  const [sortBy, setSortBy] = useState("titleAsc");

  const [menuClick, setMenuClick] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddNotePopupShow = () => {
    setAddNotePopup(!addNotePopup);
    setMenuClick(false);
  };

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  return (
    <Router>
      {addNotePopup && (
        <AddNotePopup
          handleAddNotePopupShow={handleAddNotePopupShow}
          setNotes={setNotes}
          sortBy={sortBy}
        />
      )}

      {menuClick && (
        <MobileMenu
          handleAddNotePopupShow={handleAddNotePopupShow}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setMenuClick={setMenuClick}
        />
      )}

      <Switch>
        <Route path="/nodenotes/" exact>
          <Navbar
            handleAddNotePopupShow={handleAddNotePopupShow}
            handleMenuClick={handleMenuClick}
            menuClick={menuClick}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <Board notes={notes} setNotes={setNotes} sortBy={sortBy} />
        </Route>

        <Route path="/nodenotes/fullHistory">
          <FullHistory />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
