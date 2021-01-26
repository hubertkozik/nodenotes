import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

import NoteRouter from "./routes/NoteRouter.js";

const port = process.env.PORT || 5000;
const mongodbURI =
  "mongodb+srv://admin:" +
  process.env.DBPASSWORD +
  "@polsourcetaskcluster.2vnah.mongodb.net/" +
  process.env.DBNAME +
  "?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors());

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/notes/", NoteRouter);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
