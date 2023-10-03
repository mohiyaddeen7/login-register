import notesContext from "../context_useContext/notes/notesContext";
import React, { useContext, useEffect, useState } from "react";

export default function Login() {
  const { login } = useContext(notesContext);

  const [luser, setLuser] = useState({ email: "", password: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    login(luser.email, luser.password);
    setLuser({email: "", password: "" })
  };

  const onChange = (e) => {
    setLuser({ ...luser, [e.target.name]: e.target.value });
  };
  return (
    <form className="container my-5" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={luser.email}
          onChange={onChange}
          name="email"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={luser.password}
          name="password"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
