import express from "express";

import NoteModel from "../models/NoteModel.js";

const router = express.Router();

const titleAscSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.title": 1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

const titleDescSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.title": -1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

const createdAscSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.created": 1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

const createdDescSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.created": -1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

const modifiedAscSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.modified": 1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

const modifiedDescSync = (req, res) => {
  return NoteModel.find(
    { isDeleted: false },
    null,
    { sort: { "note.modified": -1 } },
    (err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    }
  );
};

router.get("/sync", async (req, res) => {
  try {
    const { sortBy } = req.query;
    if (sortBy === "titleAsc") titleAscSync(req, res);
    else if (sortBy === "titleDesc") titleDescSync(req, res);
    else if (sortBy === "createdAsc") createdAscSync(req, res);
    else if (sortBy === "createdDesc") createdDescSync(req, res);
    else if (sortBy === "modifiedAsc") modifiedAscSync(req, res);
    else if (sortBy === "modifiedDesc") modifiedDescSync(req, res);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getHistory", async (req, res) => {
  try {
    const { id } = req.query;
    NoteModel.findById(id, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getFullHistory", async (req, res) => {
  try {
    NoteModel.find((err, data) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { title, content, created, sortBy } = req.body;
    if (title && content && created) {
      const newNote = new NoteModel({
        note: [
          {
            title: title,
            content: content,
            created: created,
            modified: created,
            version: 1,
          },
        ],
        isDeleted: false,
      });
      const savedNote = await newNote.save();
      if (sortBy === "titleAsc") titleAscSync(req, res);
      else if (sortBy === "titleDesc") titleDescSync(req, res);
      else if (sortBy === "createdAsc") createdAscSync(req, res);
      else if (sortBy === "createdDesc") createdDescSync(req, res);
      else if (sortBy === "modifiedAsc") modifiedAscSync(req, res);
      else if (sortBy === "modifiedDesc") modifiedDescSync(req, res);
    } else {
      res.status(400).json({ msg: "You have to enter all fields." });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { id, title, content, modified, sortBy } = req.body;
    console.log(id);
    NoteModel.findById(id, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        let temp = data.note;
        temp.push({
          title: title,
          content: content,
          created: data.note[0].created,
          modified: modified,
          version: data.note[data.note.length - 1].version + 1,
        });
        NoteModel.findByIdAndUpdate(id, { note: temp }, (err, data) => {
          if (err) res.status(500).send(err);
          else {
            if (sortBy === "titleAsc") titleAscSync(req, res);
            else if (sortBy === "titleDesc") titleDescSync(req, res);
            else if (sortBy === "createdAsc") createdAscSync(req, res);
            else if (sortBy === "createdDesc") createdDescSync(req, res);
            else if (sortBy === "modifiedAsc") modifiedAscSync(req, res);
            else if (sortBy === "modifiedDesc") modifiedDescSync(req, res);
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id, sortBy } = req.body;
    NoteModel.findByIdAndUpdate(id, { isDeleted: true }, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        if (sortBy === "titleAsc") titleAscSync(req, res);
        else if (sortBy === "titleDesc") titleDescSync(req, res);
        else if (sortBy === "createdAsc") createdAscSync(req, res);
        else if (sortBy === "createdDesc") createdDescSync(req, res);
        else if (sortBy === "modifiedAsc") modifiedAscSync(req, res);
        else if (sortBy === "modifiedDesc") modifiedDescSync(req, res);
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
