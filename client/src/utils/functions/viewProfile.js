const ele = document.createElement('div')
ele.style.height = '30px'
ele.style.width = '96px'
ele.style.backgroundColor = '#f0f0f0'
ele.style.boxShadow = '0px 0px 4px #888888'
ele.style.position = 'fixed'
ele.innerHTML = 'View Profile'
ele.style.textAlign = 'center'
ele.style.padding = '6px 0px'
ele.style.boxSizing = 'border-box'
ele.style.fontSize = '14px'
ele.style.zIndex = 500
ele.style.cursor = 'pointer'
ele.style.color = '#282828'
ele.style.letterSpacing = '0.2px'
ele.style.display = 'none'
document.body.appendChild(ele)

ele.onmouseenter = () => {
    ele.style.backgroundColor = '#e8e8e8'
}
ele.onmouseleave = () => {
    ele.style.backgroundColor = '#f0f0f0'
    document.addEventListener('touchstart', hideElement)
    document.addEventListener('click', hideElement)
}

const showElement = () => {
    document.addEventListener('click', hideElement)
    document.addEventListener('touchstart', hideElement)
    setTimeout(() => {
        ele.style.display = 'block'
    }, 50);
}

const hideElement = () => {
    setTimeout(() => {
        ele.style.display = 'none'
    }, 3000);
    document.removeEventListener('touchstart', hideElement)
    document.removeEventListener('click', hideElement)
}

const viewProfile = (username, mouse) => {
    var x = mouse.clientX
    var y = mouse.clientY
    var height = parseInt(ele.style.height);
    var width = parseInt(ele.style.width);
    
    if (mouse.clientY + height >= window.innerHeight) {
        y = y - height
    }
    if (mouse.clientX + width >= window.innerWidth) {
        x = x - width
    }
    
    ele.style.top = `${y}px`
    ele.style.left = `${x}px`
    
    showElement()
    
    ele.onclick = () => {
        ele.style.display = 'none'
        document.getElementById('profilePage').setAttribute('user', '')
        document.getElementById('profilePage').click()
        document.getElementById('profilePage').setAttribute('user', username)
        document.getElementById('profilePage').click()
    }
}

export default viewProfile