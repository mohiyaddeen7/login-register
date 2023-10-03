import UsersContext from "./usersContext";
import { useNavigate } from "react-router-dom";
import {useState } from "react";

const UsersState = ({ props, children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
  const getUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/getuser",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },

          // body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        console.log("hiasdasdas");
        const data = await response.json(); // parses JSON response into native JavaScript objects
        setUser(data);
      }
    } catch (error) {
      return error.message;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        user,
        login,
        signup,
        getUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
