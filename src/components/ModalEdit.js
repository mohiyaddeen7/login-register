import React, { useContext, useEffect, useState } from "react";
import notesContext from "../context_useContext/notes/notesContext";

export default function ModalEdit() {
  const { notes, editNote } = useContext(notesContext);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    tag: "",
    id: null,
  });

  useEffect(() => {
    const exampleModal = document.getElementById("exampleModal");

    const handleModalShow = (event) => {
      const button = event.relatedTarget;
      const modal_edit_note_id = button.getAttribute("data-bs-noteid");
      const modal_edit_note = notes.find(
        (note) => note._id === modal_edit_note_id
      );

      if (modal_edit_note) {
        setModalData({
          title: modal_edit_note.title,
          description: modal_edit_note.description,
          tag: modal_edit_note.tag,
          id: modal_edit_note._id,
        });
      }
    };

    if (exampleModal) {
      exampleModal.addEventListener("show.bs.modal", handleModalShow);

      return () => {
        exampleModal.removeEventListener("show.bs.modal", handleModalShow);
      };
    }
  }, [notes]);

  const handleSubmit = (e) => {

    e.preventDefault();
    const { title, description, tag, id } = modalData;
    editNote(title, description, tag, id);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control modalBody-title-input"
                  id="recipient-name"
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea
                  className="form-control modalBody-description-input"
                  id="message-text"
                  value={modalData.description}
                  onChange={(e) =>
                    setModalData({ ...modalData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Tag:
                </label>
                <input
                  type="text"
                  className="form-control modalBody-tag-input"
                  id="recipient-name"
                  value={modalData.tag}
                  onChange={(e) =>
                    setModalData({ ...modalData, tag: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
