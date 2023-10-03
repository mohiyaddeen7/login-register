import { useEffect } from "react";
import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(prop) {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("token")
    navigate('/login')
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]); //demonstration of useLocation
  return (
    <>
      <div className={`nav ${prop.mode}`}>
        <h3>
          <NavLink to={"/"}>{prop.name}</NavLink>
        </h3>
        <ul className="list">
          <li>
            {/* two ways of accessing location , 1 - is NavLink with isActive and isPending ,
            2 - is using useLocation hook*/}
            <NavLink
              to={"/"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                };
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              style={{
                color: location.pathname === "/about" ? "white" : "black",
              }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>Contact</NavLink>
          </li>
          {!localStorage.getItem("token") && (
            <li>
              <NavLink
                to={"/login"}
                style={{
                  color: location.pathname === "/login" ? "white" : "black",
                }}
              >
                Login
              </NavLink>
            </li>
          )}
          {!localStorage.getItem("token") && (
            <li>
              <NavLink
                to={"/signup"}
                style={{
                  color: location.pathname === "/signup" ? "white" : "black",
                }}
              >
                Signup
              </NavLink>
            </li>
          )}
          {localStorage.getItem("token") && (
            <li>
              <button type="button" onClick={onClick}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  name: "Brand logo",
  mode: "light",
};
