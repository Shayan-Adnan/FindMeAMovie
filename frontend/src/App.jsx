import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import Results from "./pages/Results";
import Movie from "./pages/Movie";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/results" element={<Results />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
