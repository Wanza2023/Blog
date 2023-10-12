import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Main";
import PostWrite from "./pages/PostWrite";
import PostList from "./pages/PostList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/:land" element={<Main />} />
        <Route path="write" element={<PostWrite />} />
        <Route path="post-list" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
