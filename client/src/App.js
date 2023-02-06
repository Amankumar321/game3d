import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import GameRoom from './components/GameRoom/GameRoom';
import { globalsocket } from './utils/socket/main';

function App() {
  
  globalsocket()

  return(
  <BrowserRouter>
    <Container>
        <Switch>
          <Route path = "/" exact component = {Home} />
          <Route path = '/profile/:user' exact component = {Profile} />
          <Route path = '/room/:room' exact component = {GameRoom} />
        </Switch>
    </Container>
  </BrowserRouter>
  
  )
}

export default App;
