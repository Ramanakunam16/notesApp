// import React from "react";

function Note({ note, id, toggleImportant }) {
  // console.log(note);
  const label = note.important ? "make unimportant" : "make important";
  return (
    <li>
      <p>
        {id}.{note.content}
      </p>
      <button onClick={toggleImportant}>{label}</button>
    </li>
  );
}

export default Note;
