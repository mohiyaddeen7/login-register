import React, { useEffect } from "react";
import usersContext from "../context_useContext/usersContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, getUser } = useContext(usersContext);

  const navigate = useNavigate();
  useEffect(() => {
    //checking if user is logged in or not
    if (!localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      navigate("/login");
    } else {
      getUser();
    }
  }, []);
  return (
    <>
      <div className="container my-4">
        <h2>User Details</h2>
        <p>
          <b> Name : {user.name}</b>
        </p>
        <p>
          <b> Email : {user.email}</b>
        </p>
      </div>
    </>
  );
}
