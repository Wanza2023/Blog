import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/:land" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
