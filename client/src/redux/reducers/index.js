import { combineReducers } from 'redux'

import user from './user.js'
import profile from './profile.js'
import room from './room.js'

export const reducers = combineReducers({user, profile, room})