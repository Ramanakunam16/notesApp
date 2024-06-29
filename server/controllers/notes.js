const notesRouter = require("express").Router();
const Note = require("../models/note");
const logger = require("../utils/logger");

// notesRouter.get('/', (req, res) => {
//   res.send('<h1>hello world<h1/>')
// })

notesRouter.get("/", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      logger.info(err);
    });
});

notesRouter.post("/", (req, res, next) => {
  const body = req.body;
  logger.info(body);

  // if (!body.content) {
  //   return res.status(400).json({ error: "content missing" });
  // }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
});

notesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  logger.info(id);
  logger.info(typeof id);
  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end();
    })
    .catch((err) => {
      logger.info("error occured");
      // res.status(400).send({ error: "malformatted id" });
      next(err);
    });
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;
  const note = {
    content,
    important,
  };
  const id = req.params.id;
  logger.info(id);
  logger.info(typeof id);

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updateNote) => {
      res.json(updateNote);
    })
    .catch((err) => next(err));
});

notesRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  logger.info(id);
  logger.info(typeof id);

  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      logger.info(err);
      next(err);
    });

  //
});

module.exports = notesRouter;

// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((note) => Number(note.id))) : 0;
//   return String(maxId + 1);
// };
