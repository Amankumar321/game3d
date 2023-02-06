export const showLoginComponent = (type = 'signin') => {
    var isSignup = document.getElementById('loginPage').getAttribute('issignup') ?? false
    console.log(type, isSignup)

    if (type === 'signin') {
        if (isSignup === 'true') {
            document.getElementById('authSwitchBtn').click()
        }
    }
    else if (type === 'signup') {
        if (isSignup === 'false') {
            document.getElementById('authSwitchBtn').click()
        }
    }

    if (document.getElementById('loginPage').style.display !== 'block') {
        document.getElementById('loginPage').style.display = 'block'
    }
    else {
        document.getElementById('loginPage').style.display = 'none'
    }
}

