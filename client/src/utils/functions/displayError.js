var errorData = {}

const getUsers = () => {
    return (errorData.userList !== undefined ? errorData.userList : [])
}

const updateList = (code, data) => {
    errorData = {...data}
    if (code === 'PlayersFullError') {
        errorList[code] = `Maximum 2 players can play at a time.<br/>Playing: "${getUsers()[0]}" and "${getUsers()[1]}"`
    }
}

const errorList = {
    'UnknownError': 'Some unknown error occured',
    'UsernameError': 'Username can contain only alphabets, numbers and special characters (@ # & $ _ - .)',
    'UsernameLengthError': 'Username must be between 3-22 characters',
    'UserPasswordError': 'Password can contain only alphabets, numbers and special characters (! @ # $ % ^ & * _ - .)',
    'UserPasswordLengthError': 'Password must be between 3-22 characters',
    'RoomIdError': 'Room Id must be 6 character alphanumeric (a-z and 0-9)',
    'RoomPasswordError': 'Password can contain only alphabets, numbers and special characters (! @ # $ % ^ & * _ - .)',
    'RoomPasswordLengthError': 'Room Password must be between 3-22 characters',
    'InvalidRoomIdError': 'Invalid Room ID',
    'UsernameExistError': 'Username already exists',
    'NoUsernameError': 'Username does not exist',
    'IncorrectPasswordError': 'Incorrect password',
    'NoProfileError': 'No profile found',
    'RoomIdCopied': 'Room ID copied',
    'PlayersFullError': `Maximum 2 players can play at a time.<br/>Playing: ${getUsers()} and ${getUsers()}`,
    'CantPublicRoomError': 'Rooms with password cannot be made public',
    'ImageUploadError': 'An error occured while uploading image',
    'FileTooBigError': 'File size too big. Limit: 3MB',
}



var errorCount = 0;
var stack = []

const fadeOutEffect = (id, interval) => {
    var fadeTarget = document.getElementById(id);
    if (fadeTarget == null) return;
    fadeTarget.style.opacity = '1';
    var fadeEffect = setInterval(function () {
        if (parseFloat(fadeTarget.style.opacity) > 0) {
            var opacity = parseFloat(fadeTarget.style.opacity) - 0.1
            fadeTarget.style.opacity = `${opacity}`;
        } else {
            fadeTarget.style.display = 'none';          
            fadeTarget.style.opacity = '1';
            clearInterval(fadeEffect);
        }
    }, interval);
}

export const displayError = (code, data = {}) => {
    var ele = document.getElementById('closeErrorDiv')
    var box = document.getElementById('errorBox')

    errorCount += 1;
    
    var timer = setTimeout(() => {
        ele.style.display = 'none'
        fadeOutEffect('errorBox', 80)
        errorCount -= 1;
    }, 5000);

    stack.push(timer)

    if (errorCount > 1) {
        stack.forEach(ele => {
            if (ele !== timer) {
                clearTimeout(ele)
            }
        });
    }

    updateList(code, data)
    document.getElementById('errorBox').style.display = 'block' 
    document.getElementById('errorBox').innerHTML = errorList[code]

    ele.style.left = `${box.offsetLeft + box.offsetWidth/2}px`
    ele.style.top = `${box.offsetTop}px`
    ele.style.display = 'flex'

}
