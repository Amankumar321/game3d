import { makeStyles } from '@mui/styles/index.js';

const shapeFrame = { 'TheCube': 'square', 'TowerBlock': 'portrait', 'Hextris': 'square' }

const size = {
    'square': {
        'xs': { 'width': '90vw !important', 'height': '90vw !important' },
        'sm': { 'width': '500px !important', 'height': '500px !important' },
        'md': { 'width': '41vw !important', 'height': '41vw !important' }
    },
    'portrait': {
        'xs': { 'width': '90vw !important', 'height': '120vw !important' },
        'sm': { 'width': '500px !important', 'height': '550px !important' },
        'md': { 'width': '40vw !important', 'height': '45vw !important' }
    },
    'landscape': {
        'xs': { 'width': '90vw !important', 'height': '60vw !important' },
        'sm': { 'width': '700px !important', 'height': '500px !important' },
        'md': { 'width': '80vw !important', 'height': '60vw !important' }
    }
}

export default makeStyles((theme) => ({
    frames: {
        position: 'relative !important',
        width: '100% !important',
        display: 'flex !important',
        justifyContent: 'space-around !important',
        flexWrap: 'wrap !important',
        backgroundColor: '#e2e2e2 !important',
    },
    tagNameOuter: {
        position: 'absolute !important',
        top: '28px !important',
        height: '30px !important',
        width: '120px !important',
        minWidth: 'fit-content !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        color: '#282828 !important',
        boxSizing: 'border-box !important',
        paddingLeft: '20px !important',
        paddingRight: '20px !important',
        zIndex: '3 !important',
        transform: 'skew(-30deg) !important',
        backgroundColor: '#e2e2e2 !important',
        borderBottom: '1px solid #aaaaaa !important',
        borderRight: '1px solid #aaaaaa !important',
    },
    tagNameInner: {
        letterSpacing: '0.6px !important',
        transform: 'skew(30deg) !important',
        boxSizing: 'border-box !important',
    },
    gameFrame: {
        margin: '20px 10px !important',
        border: '1px solid #aaaaaa !important',
        borderRadius: '4px !important',
        width: '600px !important',
        height: '600px !important',
        backgroundColor: '#e2e2e2 !important',
        left: '0 !important',
        top: '56px !important',
        [theme.breakpoints.up('md')]: {
            width: props => ((size[shapeFrame[props.type]])['md'])['width'] + ' !important',
            height: props => ((size[shapeFrame[props.type]])['md'])['height'] + ' !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: props => ((size[shapeFrame[props.type]])['sm'])['width'] + ' !important',
            height: props => ((size[shapeFrame[props.type]])['sm'])['height'] + ' !important',
        },
        [theme.breakpoints.down('xs')]: {
            width: props => ((size[shapeFrame[props.type]])['xs'])['width'] + ' !important',
            height: props => ((size[shapeFrame[props.type]])['xs'])['height'] + ' !important',
            top: '46px !important',
        },
    },
    fullScreenDiv: {
        position: 'absolute !important',
        top: '20px !important',
        right: '10px !important',
        padding: '8px !important',
        color: '#282828 !important',
        boxSizing: 'border-box !important',
        zIndex: '3 !important',
        backgroundColor: '#e2e2e2 !important',
        opacity: '0.8 !important',
        border: '1px solid #aaaaaa !important',
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
    fullScreenIcon: {
        fontSize: '24px !important',
    },
    minScreenDiv: {
        position: 'fixed !important',
        right: '8px !important',
        top: '76px !important',
        padding: '8px !important',
        zIndex: '10 !important',
        border: '1px solid #aaaaaa !important',
        opacity: '0.8 !important',
        boxSizing: 'border-box !important',
        [theme.breakpoints.down('xs')]: {
            top: '66px !important',
        },
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
}));
