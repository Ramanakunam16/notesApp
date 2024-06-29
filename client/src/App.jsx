import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

// function Display({ counter }) {
//   return <div>{counter}</div>;
// }

// function Button({ onClick, text }) {
//   return <button onClick={onClick}>{text}</button>;
// }

// function App() {
//   const  [counter, setCounter] = useState(0);
//   // setTimeout(() => {
//   //   setCounter((counter += 1));
//   // }, 1000);

//   const increase = () => {
//     setCounter((counter += 1));
//   };
//   const reset = () => {
//     setCounter(0);
//   };
//   const minus = () => {
//     counter > 0 ? setCounter((counter -= 1)) : 0;
//   };

//   console.log(counter);
//   return (
//     <>
//       <Display counter={counter} />
//       <Button onClick={increase} text="plus" />
//       <Button onClick={minus} text="minus" />
//       <Button onClick={reset} text="reset" />
//     </>
//   );
// }

// function Button({ onClick, text }) {
//   return <button onClick={onClick}>{text}</button>;
// }
// function Display({ click }) {
//   return (
//     <div>
//       <p>Left:{click.left}</p>
//       <p>Right:{click.right}</p>
//     </div>
//   );
// }
// function App() {
//   const [click, setClick] = useState({ left: 0, right: 0 });
//   const [allClicks, setAllClicks] = useState([]);
//   const [total, setTotal] = useState(0);

//   const onLeftClick = () => {
//     const clicks = {
//       ...click,
//       left: click.left + 1,
//     };
//     setClick(clicks);
//     setAllClicks(allClicks.concat("L"));
//     setTotal((total) => total + 1);
//   };
//   const onRightClick = () => {
//     const clicks = {
//       ...click,
//       right: click.right + 1,
//     };
//     setClick(clicks);
//     setAllClicks(allClicks.concat("R"));
//     setTotal((total) => total + 1);
//   };
//   const onReset = () => {
//     setTotal((total) => total + 1);
//     setClick({ left: 0, right: 0 });
//     setAllClicks(allClicks.concat("Reset"));
//   };

//   return (
//     <>
//       <Display click={click} />
//       <Button onClick={onLeftClick} text="left" />
//       <Button onClick={onRightClick} text="right" />
//       <Button onClick={onReset} text="reset" />
//       <p>{allClicks.join(":::")}</p>
//       <p>{total}</p>
//     </>
//   );
// }
// const Course = ({ course }) => (
//   <div>
//     <Header course={course} />
//   </div>
// );

// const App = () => {
//   const course = {
//     // ...
//   };
//   console.log("app working");

//   return (
//     <div>
//       <Course course={course} />
//       {/* {console.log("app working")} */}
//     </div>
//   );
// };

function App() {
  /////////////////////////////////////////////////////////////////////////
  /* component state assingment and management */
  /////////////////////////////////////////////////////////////////////////

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /////////////////////////////////////////////////////////////////////////
  /* handler functions */
  /////////////////////////////////////////////////////////////////////////

  const addNote = (e) => {
    e.preventDefault();

    const note = { content: newNote, important: false };
    const allnotes = [...notes, note];
    noteService.createNote(note).then((newNote) => {
      console.log(newNote);
      setNotes(allnotes);
    });
  };

  const showAllNotes = () => {
    setShowAll((showAll) => !showAll);
  };

  const toogleImportant = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((notes) => notes.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .updateNote(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
        alert(
          "Do you want Mark Note No. " +
            id +
            ` as ${changedNote.important ? " important" : " unimportant"}`
        );
      })
      .catch((err) => {
        console.log(err);
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  /////////////////////////////////////////////////////////////////////////
  /* Side Effects */
  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    noteService.getAllNotes().then((initialNotes) => {
      // console.log();
      console.log(initialNotes);
      setNotes(initialNotes);
    });
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  /////////////////////////////////////////////////////////////////////////
  /*Assigning javascript varibale*/
  /////////////////////////////////////////////////////////////////////////

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  console.log(notesToShow);
  /////////////////////////////////////////////////////////////////////////
  /* component to be rendered */
  /////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="notes">
        {error ? <Notification message={errorMessage} /> : ""}
        <h1>Notes</h1>
        <ul>
          {notesToShow.map((note, i) => {
            // console.log(note);

            return (
              <Note
                key={note.id}
                note={note}
                num={i + 1}
                toggleImportant={() => toogleImportant(note.id)}
              />
            );
          })}
        </ul>
        <form onSubmit={addNote}>
          <input
            type="text"
            placeholder="add a new Note"
            value={newNote}
            onChange={(e) => {
              setNewNote(e.target.value);
            }}
          />
          <button type="submit">Add Note</button>
        </form>

        <button onClick={showAllNotes}>
          show {showAll ? "important" : "ALL"}
        </button>
      </div>
      <Footer />
    </>
  );
}

export default App;
