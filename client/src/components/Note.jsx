// import React from "react";

function Note({ note, toggleImportant }) {
  // console.log(note);
  const label = note.important ? "make unimportant" : "make important";
  return (
    <li>
      <p>
        {note.id}.{note.content}
      </p>
      <button onClick={toggleImportant}>{label}</button>
    </li>
  );
}

export default Note;
