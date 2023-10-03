import React from "react";
import Notes from "../components/Notes";
import Addnote from "./Addnote";

export default function Home() {
  return (
    <>
      <div className="container my-4">
        <div className="container my-4">
          <Addnote />
        </div>
        <div className="container my-4">
          <h2>Your Notes</h2>
          <Notes />
        </div>
      </div>
    </>
  );
}
