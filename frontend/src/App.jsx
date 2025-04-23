import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import Results from "./pages/Results";
import Movie from "./pages/Movie";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import CreateList from "./pages/CreateList";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/options" element={<Options />} />
          <Route path="/results" element={<Results />} />
          <Route path="/movie/:id" element={<Movie />} />

          <Route
            path="/createList"
            element={
              <RequireAuth>
                <CreateList />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
