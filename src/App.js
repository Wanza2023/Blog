import { BrowserRouter, Route, Routes,} from "react-router-dom";
import "./styles/App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import PostWrite from "./pages/PostWrite";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import PostViewEx from "./pages/PostViewEx";
import PersonalHome from './pages/PersonalHome';
import Navbar from "./component/Navbar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar/>
        <div className="body">
          <Routes>
            <Route index element={<Main />} />
            <Route path="/:land" element={<Main />} />
            <Route path="write" element={<PostWrite />} />
            <Route path="post-list/:regionName" element={<PostList />} />
            <Route path="post-view" element={<PostViewEx />} />
            <Route path="/:nickname/:boardId" element={<PostView />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/:nick" element={<PersonalHome/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;