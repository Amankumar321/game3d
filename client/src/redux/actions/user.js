import * as api from '../../api/index.js';
import { displayError } from '../../utils/functions/displayError.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData).catch((error) => {
      if (error.response.status === 404) {
        displayError('NoUsernameError')
      }
      if (error.response.status === 400) {
        displayError('IncorrectPasswordError')
      }
      if (error.response.status === 500) {
        displayError('UnknownError')
      }
    })
    
    dispatch({ type: 'AUTH', data })

    window.location.reload()
  } 
  catch (error) {
    console.log(error)
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData).catch((error) => {
      if (error.response.status === 403) {
        displayError('UsernameExistError')
      }
      if (error.response.status === 500) {
        displayError('UnknownError')
      }
    })
    dispatch({ type: 'AUTH', data })

    window.location.reload()
  } 
  catch (error) {
    console.log(error)
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGOUT' })   
    window.location.assign('/')
  } 
  catch (error) {
    console.log(error)
  }
}
