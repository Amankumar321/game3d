import './App.css';
import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import GameRoom from './components/GameRoom/GameRoom.js';
import { globalsocket } from './utils/socket/main.js';

function App() {
  
  globalsocket()

  return(
  <BrowserRouter>
    <Container>
        <Routes>
          <Route index element = {<Home/>} />
          <Route path = '/profile/:user' element = {<Profile/>} />
          <Route path = '/room/:room' element = {<GameRoom/>} />
        </Routes>
    </Container>
  </BrowserRouter>
  
  )
}

export default App;
