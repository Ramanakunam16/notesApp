const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const passowrd = process.argv[2];

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => {
  console.log("connected");
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "fullstackopen is become my daily learning path",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved", result);
//   mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//     mongoose.connection.close();
//   });
// });
