import { Input, Paper, Button } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup} from '../../redux/actions/user.js'
import decode from 'jwt-decode'
import useStyles from './style.js';
import { verifyUsername, verifyUserPassword } from '../../utils/functions/verifyInput.js'

const initialState = { username: '', password: '' }

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch()
    const history = useNavigate()
    const [isSignup, setIsSignup] = useState(false)
    const [user, setUser] = useState(localStorage.getItem('token'))
    const classes = useStyles();
    
    if(user){
        var token = user
        try {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){          
            }
            else{
                
            }
        } catch (error) {
            
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const closeLoginPage = () => {
        document.getElementById('loginPage').style.display = 'none'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            if (!verifyUsername(form.username)) return
            if (!verifyUserPassword(form.password)) return
            dispatch(signup(form, history))
        } 
        else {
            dispatch(signin(form, history))
        }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <div id='loginPage' style={{display: 'none'}} issignup={`${isSignup}`}>
            <div className={classes.overlay} ></div>
            <Paper className={classes.paper}>
                <div className={classes.closeAuthBtn}>
                    <i className={`${classes.closeIcon} fas fa-times`} onClick={() => {closeLoginPage()}}></i>
                </div>
                <form onSubmit = {handleSubmit} className={`${classes.root} ${classes.form}`}>
                    <label className={classes.labels}>Username</label>
                    <Input className={classes.inputs} name = "username" label = "Username" onChange = {handleChange} />
                    <label className={classes.labels}>Password</label>
                    <Input className={classes.inputs} name = "password" label = "Password" type='password' onChange = {handleChange} />
                    <Button className={classes.buttonSubmit} type = "submit" variant = "contained">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <p style={{ 'margin': '6px auto', }}>
                        { isSignup ? 'Already have an account?' : "Don't have an account?" }
                    </p>
                    <Button onClick={switchMode} id='authSwitchBtn' className={classes.buttonSwitch} variant = "contained">
                        { isSignup ? 'Sign in' : "Sign Up" }
                    </Button>
                </form>
            </Paper>
        </div>
    )
}

export default Auth
