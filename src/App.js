import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,} from "react-router-dom";
import "./styles/App.css";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import Main from "./pages/main/Main";
import Intro from "./pages/main/Intro";
import PostList from "./pages/list/PostList";
import BookmarkList from "./pages/list/BookmarkList";
import PostWrite from "./pages/post/PostWrite";
import SearchList from "./pages/list/SearchList";
import HashtagList from "./pages/list/HashtagList";
import RegionList from "./pages/list/RegionList";
import PostView from "./pages/post/PostView";
import PersonalHome from './pages/personal/PersonalHome';
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/Footer";
import { RecoilRoot } from "recoil";
import SelectLocation from "./component/ui/contents/schedule/SelectLocation";
import PersonalEdit from "./pages/personal/PersonalEdit";
import PasswordFind from "./pages/sign/PasswordFind";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <BrowserRouter>
      {showIntro && <Intro />}
      {!showIntro && (
        <RecoilRoot>
          <Navbar />
          <div className="body">
            <Routes>
              <Route index element={<Main />} />
              <Route path="/:land" element={<Main />} />
              <Route path="/postlist" element={<PostList />} />
              <Route path="/bookmark" element={<BookmarkList />} />
              <Route path="board/search/:searchTerm" element={<SearchList />} />
              <Route path="board/tags/:hashtag" element={<HashtagList />} />
              <Route path="write" element={<PostWrite />} />
              <Route path="regionList/:regionName" element={<RegionList />} />
              <Route path="/:nickname/:boardId" element={<PostView />} />
              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="user/:nickname" element={<PersonalHome/>} />
              <Route path="selectlocation" element={<SelectLocation/>}/>
              <Route path="personaledit" element={<PersonalEdit />}/>
              <Route path='pwInquiry'element={<PasswordFind/>}/>
            </Routes>
          </div>
          <Footer />
          </RecoilRoot>
      )}
    </BrowserRouter>
  );
}

export default App;