import { combineReducers } from 'redux'

import user from './user'
import profile from './profile'
import room from './room'

export const reducers = combineReducers({user, profile, room})