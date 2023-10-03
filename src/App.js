import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UsersState from "./context_useContext/UsersState";

function App() {
  return (
    <Router>
      <UsersState>
        <div className="App">
          <Navbar name={"Login-register"} />
          <h2>Ladies and Gentelmen, I present to you login-register</h2>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </UsersState>
    </Router>
  );
}

export default App;
