export const loadStyles = (user_doc, type) => {
    const style = user_doc.createElement('link')
    style.rel = 'stylesheet'
    style.href = `/styles/${type}/style.css`
    user_doc.head.appendChild(style)

    if (type === 'Hextris') {
        const font = user_doc.createElement('link')
        font.rel = 'stylesheet'
        font.href = 'http://fonts.googleapis.com/css?family=Exo+2'
        font.type = 'text/css'
        user_doc.head.appendChild(font)
    }
}