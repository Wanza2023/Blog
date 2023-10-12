import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import PostWrite from "./pages/PostWrite";
import PostList from "./pages/PostList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="post-write" element={<PostWrite />} />
        <Route path="post-list" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
