import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useState } from 'react'
import NewHome from './NewHome/NewHome';
import ProfileHome from './ProfileHome/ProfileHome';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './style'

const Home = () => {
    const [user, setUser] = useState(localStorage.getItem('token'))
    const history = useHistory()
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