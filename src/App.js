import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesState from "./context_useContext/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();
  return (
    <Router>
      <NotesState >
        <div className="App">
          <Navbar name={"inotebook"} />
          <h2>Ladies and Gentelmen, I present to you inotebook</h2>
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
      </NotesState>
    </Router>
  );
}

export default App;
