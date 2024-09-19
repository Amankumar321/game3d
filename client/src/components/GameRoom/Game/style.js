import { makeStyles } from "@material-ui/core";

const shapeFrame = {'TheCube': 'square', 'TowerBlock': 'portrait', 'Hextris': 'square'}

const size = {
'square': {'xs': {'width': '90vw', 'height': '90vw'} ,
            'sm': {'width': '500px', 'height': '500px'},
            'md': {'width': '41vw', 'height': '41vw'}},

'portrait': {'xs': {'width': '90vw', 'height': '120vw'},
            'sm': {'width': '500px', 'height': '550px'},
            'md': {'width': '40vw', 'height': '45vw'}},

'landscape': {'xs': {'width': '90vw', 'height': '60vw'},
            'sm': {'width': '700px', 'height': '500px'},
            'md': {'width': '80vw', 'height': '60vw'}}
}


export default makeStyles((theme) => ({
    frames: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#e2e2e2',
    },
    tagNameOuter: {
        position: 'absolute',
        top: '28px',
        height: '30px',
        width: '120px',
        minWidth: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#282828',
        boxSizing: 'border-box',
        paddingLeft: '20px',
        paddingRight: '20px',
        zIndex: 3,
        transform: 'skew(-30deg)',
        backgroundColor: '#e2e2e2',
        borderBottom: '1px solid #aaaaaa',
        borderRight: '1px solid #aaaaaa',
    },
    tagNameInner: {
        letterSpacing: '0.6px',
        transform: 'skew(30deg)',
        boxSizing: 'border-box',
    },
    gameFrame: {
        margin: '20px 10px',
        border: '1px solid #aaaaaa',
        borderRadius: '4px',
        width: '600px',
        height: '600px',
        backgroundColor: '#e2e2e2',
        left: 0,
        top: '56px',
        [theme.breakpoints.up('md')]: {
            width: props => ((size[shapeFrame[props.type]])['md'])['width'],
            height: props => ((size[shapeFrame[props.type]])['md'])['height'],
        },
        [theme.breakpoints.down('sm')]: {
            width: props => ((size[shapeFrame[props.type]])['sm'])['width'],
            height: props => ((size[shapeFrame[props.type]])['sm'])['height'],
        },
        [theme.breakpoints.down('xs')]: {
            width: props => ((size[shapeFrame[props.type]])['xs'])['width'],
            height: props => ((size[shapeFrame[props.type]])['xs'])['height'],
            top: '46px',
        },
    },
    fullScreenDiv: {
        position: 'absolute',
        top: '20px',
        right: '10px',
        padding: '8px',
        color: '#282828',
        boxSizing: 'border-box',
        zIndex: 3,
        backgroundColor: '#e2e2e2',
        opacity: 0.8,
        //borderBottom: '1px solid #aaaaaa',
        border: '1px solid #aaaaaa',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    fullScreenIcon: {
        fontSize: '24px',
    },
    minScreenDiv: {
        position: 'fixed',
        right: '8px',
        top: '76px',
        padding: '8px',
        zIndex: 10,
        border: '1px solid #aaaaaa',
        opacity: 0.8,
        boxSizing: 'border-box',
        [theme.breakpoints.down('xs')]: {
            top: '66px',
        },
        '&:hover': {
            cursor: 'pointer',
        },
    },
}))

