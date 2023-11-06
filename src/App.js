import { BrowserRouter, Route, Routes,} from "react-router-dom";
import "./styles/App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import PostWrite from "./pages/PostWrite";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import PersonalHome from './pages/PersonalHome';
import Navbar from "./component/Navbar";
import { RecoilRoot } from "recoil";
import SelectLocation from "./component/ui/SelectLocation";

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar/>
        <div className="body">
          <Routes>
            <Route index element={<Main />} />
            <Route path="/:land" element={<Main />} />
            <Route path="board/search/:searchTerm" element={<PostList />} />
            <Route path="write" element={<PostWrite />} />
            <Route path="post-list/:regionName" element={<PostList />} />
            <Route path="/:nickname/:boardId" element={<PostView />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="user/:nickname" element={<PersonalHome/>} />
            <Route path="selectlocation" element={<SelectLocation/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;