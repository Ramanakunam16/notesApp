/*
console.log("hello world");
const http = require("http");*/

//////////////////////////////////////////////////////////
/* backend logic */
////////////////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const Note = require("./models/note");
const app = express();
const cors = require("cors");
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};
app.use(requestLogger);

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });

const unknownEndPoint = (req, res) => {
  res.status(404).json({ error: "unknown end point" });
};

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(errcle);
};

app.get("/", (req, res) => {
  res.send("<h1>hello world<h1/>");
});

app.get("/api/notes", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body.content) {
    return res.status(404).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  console.log(typeof id);
  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end();
    })
    .catch((err) => {
      console.log("error occured");
      // res.status(400).send({ error: "malformatted id" });
      next(err);
    });
});

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  const id = req.params.id;
  console.log(id);
  console.log(typeof id);

  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updateNote) => {
      res.json(updateNote);
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  console.log(typeof id);

  Note.findByIdAndDelete(id)
    .then((note) => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

  //
});

// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((note) => Number(note.id))) : 0;
//   return String(maxId + 1);
// };

app.use(unknownEndPoint);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
