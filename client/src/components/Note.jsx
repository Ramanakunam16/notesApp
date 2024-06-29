// import React from "react";

function Note({ note, num, toggleImportant }) {
  // console.log(note);
  const label = note.important ? "make unimportant" : "make important";
  return (
    <li>
      <p>
        {num}.{note.content}
      </p>
      <button onClick={toggleImportant}>{label}</button>
    </li>
  );
}

export default Note;
