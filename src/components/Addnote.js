import { useContext, useState } from "react";
import notesContext from "../context_useContext/notes/notesContext";

export default function Addnote() {
  const { notes, addNote } = useContext(notesContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag?note.tag:"General");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2>Add note</h2>
      <form className="g-3" onSubmit={handleSubmit}>
        <div className="md-4">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            value={note.title}
            onChange={onChange}
            name="title"
            required
          />
        </div>
        <div className="md-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="validationTextarea"
            placeholder="Required example textarea"
            value={note.description}
            onChange={onChange}
            name="description"
            required
          ></textarea>
          <div className="invalid-feedback">
            Please enter a message in the textarea.
          </div>
        </div>
        <div className="md-4">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            placeholder="General"
            onChange={onChange}
            name="tag"
          />
        </div>
        <div className="col-12 my-2">
          <button className="btn btn-success" type="submit">
            Add note
          </button>
        </div>
      </form>
    </>
  );
}
