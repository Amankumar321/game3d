import { displayError } from "./displayError"

export const verifyUsername = (query) => {
    if (query.match(/^.{3,22}$/)) {
        if (query.match(/^[0-9a-zA-Z-_.@#\$&]{3,22}$/)) {
            return true
        }
        else {
            displayError('UsernameError')
            return false
        }
    }
    else {
        displayError('UsernameLengthError')
        return false
    }
}
export const verifyUserPassword = (query) => {
    if (query.match(/^.{3,22}$/)) {
        if (query.match(/^[0-9a-zA-Z-_.!@#\$%\^&*]{3,22}$/)) {
            return true
        }
        else {
            displayError('UserPasswordError')
            return false
        }
    }
    else {
        displayError('UserPasswordLengthError')
    }
}

export const verifyRoomId = (query) => {
    if (query.match(/^[0-9a-z]{6}$/)) {
        return true
    }
    else {
        displayError('RoomIdError')
        return false
    }
}

export const verifyRoomPassword = (query) => {
    if (query.match(/^.{3,22}$/)) {
        if (query.match(/^[0-9a-zA-Z-_.!@#\$%\^&*]{3,22}$/)) {
            return true
        }
        else {
            displayError('RoomPasswordError')
            return false
        }
    }
    else {
        displayError('RoomPasswordLengthError')
    }
}

