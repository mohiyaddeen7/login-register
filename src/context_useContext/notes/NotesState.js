import { useEffect, useState } from "react";
import NotesContext from "./notesContext";
import { useNavigate } from "react-router-dom";

const NotesState = ({ props, children }) => {
  const notesInitial = [];
  const navigate = useNavigate();

  const getNotes = async () => {
    console.log("get");
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallnotes",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },

          // body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        console.log("hiasdasdas");
        const data = await response.json
        (); // parses JSON response into native JavaScript objects
        setNotes(data);
      }
    } catch (error) {
      return error.message;
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      return error.message;
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      let result = await response.text();
      if (result === "success") {
        getNotes();
        console.log("success");
      }
    } catch (error) {
      return error.message;
    }
  };

  const editNote = async (title, description, tag, id) => {
    console.log("hi");
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const result = await response.json();
    if (result) {
      getNotes();
      console.log("success");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.jwt);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.jwt);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        login,
        signup,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesState;
