import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles/App.css";
import Navbar from './Components/Common/Navbar';
import PersonalHome from './PersonalHome';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='body'>
        <Routes>
          <Route path="/personalhome/" element={<PersonalHome/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;