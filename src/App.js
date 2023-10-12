import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import "./styles/App.css";
import Navbar from './Components/Common/Navbar';
import PersonalHome from './PersonalHome';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/personalhome/" element={<PersonalHome/>}/>
      </Routes>
    </Router>
  )
}

export default App;
