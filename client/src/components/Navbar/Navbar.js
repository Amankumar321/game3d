import { AppBar, Button, Toolbar, Avatar, Typography, Input, Tabs, Tab, Drawer, TextField, OutlinedInput } from '@material-ui/core/index.js'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './style.js'
import default_avatar from "../../assets/images/default.jpg"
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { logout } from '../../redux/actions/user.js'
import decode from 'jwt-decode'
import Chat from '../Chat/Chat.js'
import { searchUsers } from '../../api/index.js'
import viewProfile from '../../utils/functions/viewProfile.js'
import Auth from '../Auth/Auth.js'
import Profile from '../Profile/Profile.js'
import ErrorBox from '../ErrorBox/ErrorBox.js'
import { showLoginComponent } from '../../utils/functions/showLoginComponent.js'
import { BACKEND_URL } from '../../constants.js'


const Navbar = () => {
    const [user, setUser] = useState(localStorage.getItem('token'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [avatar, setAvatar] = useState(localStorage.getItem('image'))
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const classes = useStyles()
    const [searchList, setSearchList] = useState([]);
    const [viewUser, setViewUser] = useState('');
    
    const logOut = () => {
        dispatch(logout());
        setUser(null);
    }

    const myProfile = () => {
        document.getElementById('profileOptions').style.display = 'none'
        document.getElementById('profilePage').setAttribute('user', username)
        document.getElementById('profilePage').click()
        document.getElementById('profilePage').style.display = 'block'
    }

    const toggleChat = () => {
        var curr = document.getElementById('chatframe').style.display;
        if (curr == 'flex') {
            document.getElementById('chatframe').style.display = 'none';
        }
        else {
            document.getElementById('chatframe').style.display = 'flex';
        }
    }

    const toggleOptions = () => {
        var curr = document.getElementById('optionDiv').style.display;
        if (curr == 'flex') {
            document.getElementById('optionDiv').style.display = 'none';
        }
        else {
            document.getElementById('optionDiv').style.display = 'flex';
        }
    }

    const showSignInComponent = () => {
        showLoginComponent('signin')
    }

    const search = async (e) => {
        var searchResult = document.getElementById('searchResult')
        var searchResult2 = document.getElementById('searchResult2')

        if (e.target.value === '') {
            searchResult.style.display = 'none'
            searchResult2.style.display = 'none'
            return;
        }

        if (e.target.id === 'searchBar') {
            searchResult.style.left = `${document.getElementById(e.target.id).offsetLeft}px`
        }
        var userInput = e.target.value
        const { data } = await searchUsers(userInput)
        setSearchList({...data}.users)

        if (e.target.id === 'searchBar') {
            searchResult.style.display = 'block'
        }
        if (e.target.id === 'searchBar2') {
            searchResult2.style.display = 'block'
        }
    }

    const handleProfileClick = () => {
        const hideElement = () => {
            ele.style.display = 'none'
            document.removeEventListener('click', hideElement)
        }

        const ele = document.getElementById('profileOptions')
        if (ele.style.display === 'flex') {
            ele.style.display = 'none'
        }
        else {
            ele.style.display = 'flex'
            setTimeout(() => {
                document.addEventListener('click', hideElement)
            }, 50); 
        }
    }

    setInterval(() => {
        var token = user
        if(token){
            try {
                const decodedToken = decode(token)
                if(decodedToken.exp * 1000 < new Date().getTime()){
                    logOut()
                }
            } catch (error) {
                logOut()
            }
        }
    }, 1000)

    useEffect(() => {
        document.getElementById('searchBar').addEventListener('focusout', () => {
            //document.getElementById('searchResult').style.display = 'none'
        })
        document.getElementById('searchBar2').addEventListener('focusout', () => {
            //document.getElementById('searchResult2').style.display = 'none'
        })
    }, [searchList])

    const setProfilePage = (e) => {
        var toView = document.getElementById('profilePage').getAttribute('user')
        setViewUser(toView)
    }

    const clearInput = () => {
        document.getElementById('searchBar').value = ''
        document.getElementById('searchBar2').value = ''
        document.getElementById('searchResult').style.display = 'none'
        document.getElementById('searchResult2').style.display = 'none'
    }

    return (
        <div>
            <Auth />
            <div id='profilePage' style={{display: 'none'}} onClick={setProfilePage}>
                {
                    viewUser !== '' ?
                    <Profile user={viewUser} setAvatar={setAvatar} />
                    : null
                }
            </div>
            <ErrorBox />
            <AppBar className={classes.appBar}>
                <Link to="/" className={classes.brandContainer}>
                    <img className={classes.image} src='/logo.gif' alt="Game Link" />
                </Link>
                <div className={classes.brandName}>
                        GAME LINK
                </div>
                <input className={`${classes.searchBar} ${classes.hideMobile}`} id='searchBar' placeholder='Search User' onChange={search} />
                <i className={`${classes.clearIcon} fas fa-times`} onClick={() => {clearInput()}}></i>
                <SearchBox id='searchResult' classes={classes} class={classes.searchResult} searchList={searchList}></SearchBox>
                { user != null ? (
                        <div>
                            <Link className={classes.navTab}>My Profile</Link>
                            <Link className={classes.navTab}>Friends</Link>
                            <Link className={classes.navTab}>Groups</Link>
                            <Link className={classes.navTab}>Rooms</Link>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                <Toolbar className={classes.toolbar}>
                    <div className={classes.optionBtn}>
                        <i className={`${classes.icon} fas fa-bars`} onClick={() => toggleOptions()}></i>
                    </div>
                        { user != null ? (
                            <Avatar className={classes.avatar} alt={username} src={avatar!== 'null' ? BACKEND_URL + avatar : default_avatar} onClick={handleProfileClick}/>         
                        ) : (
                            <Button className = {classes.button} onClick={showSignInComponent} variant="contained">Login</Button>
                        )
                        }
                    <div className={classes.profileOptionsDiv} id='profileOptions'>
                        <div className={classes.arrowTriangle}></div>
                        <div className={classes.profileOptionItem} onClick={() => {myProfile()}}>My Profile</div>
                        <div className={classes.profileOptionDivider}></div>
                        <div className={classes.profileOptionItem} onClick={logOut}>Logout</div>
                    </div>
                    <div className={classes.drawerBtn}>
                        <i aria-label='Chat' title='Chat' className={`${classes.icon} fas fa-comment`} onClick={() => toggleChat()}></i>
                    </div>
                </Toolbar> 
            </AppBar>
            <div className={classes.optionDiv} id='optionDiv'>
                <div className={classes.searchMobileDiv}>
                    <input className={`${classes.searchBar} ${classes.displayMobile}`} id='searchBar2' placeholder='Search User' onChange={search} />
                    <i className={`${classes.clearIconMobile} fas fa-times`} onClick={() => {clearInput()}}></i>
                </div>
                <SearchBox id='searchResult2' classes={classes} class={classes.searchResult2} searchList={searchList}></SearchBox>
            </div>
            <div className={classes.chatFrame} id='chatframe'>
                <Chat />
            </div>
        </div>  
    )
}





const SearchBox = (props) => {
    const searchList = props.searchList
    const classes = props.classes

    return (
        <div className={props.class} id={props.id}>
            {
                searchList.length >= 1 ? 
                searchList.map((e) => {
                    return (
                        <div className={classes.userListItem} onClick={(mouse) => {viewProfile(e.username, mouse)}}>
                            <img className={classes.userListAvatar} src={e.image !== 'null' ? BACKEND_URL + e.image : default_avatar}></img>
                            <div className={classes.userListName}>{e.username}</div>
                        </div>
                    )
                } )
                :
                <div className={classes.userListItem}>
                    <div className={classes.noUserError}>
                        <i className={`${classes.errorIcon} fas fa-exclamation-circle`}></i>
                        <div>No user found</div>
                    </div>
                </div>
            }
        </div>
    )
}



export default Navbar
