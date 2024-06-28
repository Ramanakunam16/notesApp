// console.log("hello world");

// const http = require("http");
const express = require("express");
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

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });
app.get("/", (req, res) => {
  res.send("<h1>hello world<h1/>");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(typeof id);

  //   const note = notes.find((note) => note.id === id);
  const note = notes.find((note) => note.id === id);

  note ? res.json(note) : res.status(404).end();
});
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  console.log(typeof id);

  //   const note = notes.find((note) => note.id === id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => Number(note.id))) : 0;
  return String(maxId + 1);
};
app.post("/api/notes", (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body.content) {
    return res.status(404).json({ error: "content missing" });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  notes = notes.concat(note);
  res.json(note);
});

const unknownEndPoint = (req, res) => {
  res.status(404).json({ error: "unknown end point" });
};
app.use(unknownEndPoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
