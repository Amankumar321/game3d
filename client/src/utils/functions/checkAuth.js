import decode from 'jwt-decode'
import { useState } from 'react'

const CheckAuth = (history) => {
    
        const [user, setUser] = useState(localStorage.getItem('token'))
        if(user){
            var token = user
            try {
                const decodedToken = decode(token)
                if(decodedToken.exp * 1000 < new Date().getTime()){    
                    window.location.assign('/')
                }
            } catch (error) {
                
            }
        }
        else{
            history.push('/')
        }
}

export default CheckAuth
