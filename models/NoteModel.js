import mongoose from "mongoose";

const NoteModel = new mongoose.Schema({
  note: [
    {
      title: { type: String },
      content: { type: String },
      created: { type: String },
      modified: { type: String },
      version: { type: Number },
    },
  ],
  isDeleted: Boolean,
});

export default mongoose.model("note", NoteModel);
