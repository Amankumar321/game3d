import * as api from '../../api/index.js';
import { displayError } from '../../utils/functions/displayError.js';
import { showLoginComponent } from '../../utils/functions/showLoginComponent.js';

export const createroom = (user, roomPassword=null) => async (dispatch) => {
  try {
    const { data } = await api.createRoom(user, roomPassword).catch((error) => {
      if (error.response.status === 401) {
        showLoginComponent()
      }
    })

    dispatch({ type: 'CREATE', data })

    window.location.assign(`/room/${data.id}`)
  } 
  catch (error) {
    console.log(error)
  }
}

export const checkroom = (roomId, roomPassword=null) => async (dispatch) => {
  try {
      const { data } = await api.checkRoom(roomId, roomPassword).catch((error) => {
        if (error.response.status === 404) {
          displayError('InvalidRoomIdError')
        }
        if (error.response.status === 403) {
          displayError('IncorrectPasswordError')
        }
        if (error.response.status === 401) {
          showLoginComponent()
        }
      })

      if ( data.roomId ) {
          dispatch({ type: 'CHECK', data })
          window.location.assign(`/room/${data.roomId}`)
      }
      else {
          alert('room not found')
      }
  } 
  catch (error) {
    console.log(error)
  }
}

