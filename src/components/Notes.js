import React, { useContext, useEffect } from "react";
import notesContext from "../context_useContext/notes/notesContext";
import ModalEdit from "./ModalEdit";
import {useNavigate } from "react-router-dom";

export default function Notes() {
  const { notes, deleteNote, getNotes, editNote } = useContext(notesContext);
  const handleClick = (id) => {
    deleteNote(id);
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log("hello")
    if (!localStorage.getItem("token")) {
      console.log("hi")
      console.log(localStorage.getItem("token"))
      navigate("/login");
    }
    else{
      console.log(localStorage.getItem("token"))
      getNotes();
    }
  }, []);

  return (
    <>
      <ModalEdit />
      <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
        {notes.map((note) => {
          return (
            <div className="col" key={note._id}>
              <div className="card h-100">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-body-secondary ">
                    Last updated 3 mins ago
                  </small>
                  <i
                    id="edit-modal"
                    className="fa-regular fa-pen-to-square"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-noteid={note._id}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleClick(note._id)}
                  ></i>
                  <div className="badge text-bg-success mx-3">#{note.tag}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
