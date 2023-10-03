import notesContext from "../context_useContext/notes/notesContext";
import React, { useContext, useEffect, useState } from "react";

export default function Signup() {
  const { signup } = useContext(notesContext);

  const [suser, setSuser] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(suser.cpassword===suser.password)
    signup(suser.fname,suser.email, suser.password);
    setSuser({ fname: "", email: "", password: "", cpassword: "" });
  };

  const onChange = (e) => {
    setSuser({ ...suser, [e.target.name]: e.target.value });
  };
  return (
    <form className="container my-5" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputFname"
          value={suser.fname}
          name="fname"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={suser.email}
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
          value={suser.password}
          name="password"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputCpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputCpassword1"
          value={suser.cpassword}
          name="cpassword"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
