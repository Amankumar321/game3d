import React from 'react'
import Navbar from '../Navbar/Navbar.js';
import { useState } from 'react'
import NewHome from './NewHome/NewHome.js';
import ProfileHome from './ProfileHome/ProfileHome.js';
import { Container } from '@mui/material';
import useStyles from './style.js'

const Home = () => {
    const [user, setUser] = useState(localStorage.getItem('token'))
    const classes = useStyles()
    
    return (
        <Container>
          <Navbar />
          <div className={classes.home} id='mainHomeDiv'>
            { user == null ? (
                  <NewHome />
              ) : (
                  <ProfileHome />
              )
            }
          </div>
        </Container>
    );
}

export default Home