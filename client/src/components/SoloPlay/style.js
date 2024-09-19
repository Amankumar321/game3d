import { makeStyles } from "@material-ui/core/index.js";

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'fixed',
        display: 'none',
        left: 0,
        top: '63px',
        width: '100vw',
        alignSelf: 'center',
        overflow: 'auto',
        zIndex: 10,
        //visibility: 'hidden',
        height: 'calc(100% - 63px)',
        //backgroundColor: 'red',
        [theme.breakpoints.down('xs')]: {
            top: '55px',
            height: 'calc(100% - 55px)',
        }
    },
    closeIcon: {
        fontSize: '26px',
        padding: '6px 10px',
        //textShadow: '0px 0px 2px #aaaaaa',
        //textShadow: '-1px -1px 0 #888888, 1px -1px 0 #888888, -1px 1px 0 #888888, 1px 1px 0 #888888',
    },
    closeBox: {
        position: 'absolute',
        top: '20px',
        right: '0px',
        display: 'flex',
        fontSize: '20px',
        marginRight: '26px',
        alignItems: 'center',
        borderRadius: '4px',
        zIndex: 20,
        boxSizing: 'border-box',
        opacity: 0.4,
        color: '#282828',
        [theme.breakpoints.down('xs')]: {
            marginRight: '20px',
        },
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.6,
            //transform: 'scale(1.1,1.1)',
        },
    },
    frame: {
        position: 'absolute',
        borderWidth: '0px',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    }
}))