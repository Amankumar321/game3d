import * as api from '../../api/index.js'
import { showLoginComponent } from '../../utils/functions/showLoginComponent.js'

export const editprofile = (formData, user, router) => async (dispatch) => {
    try {
        const { data } = await api.editProfile(formData, user).catch((error) => {
          if (error.response.status === 401) {
            showLoginComponent()
          }
        })
        dispatch({ type: 'EDIT', data })
        router('/')
    } 
    catch (error) {
      console.log(error)
    }
  }
