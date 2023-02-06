import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    mainDiv: {
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        top: '80px',
        zIndex: 1000,
        textAlign: 'center',
        width: '40vw',
        minWidth: '300px',
        maxWidth: '900px',
        backgroundColor: '#282828',
        color: '#cccccc',
        padding: '20px 30px',
        display: 'flex',
        letterSpacing: '0.6px',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderRadius: '4px',
        lineHeight: '1.4',
        boxShadow: '0px 0px 16px #666666',
        [theme.breakpoints.down('md')]: {
            padding: '18px 26px',
            fontSize: '15px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '16px 16px',
            fontSize: '14px',
        },
    },
    closeBtnDiv: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        //backgroundColor: '#cccccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        zIndex: 1001,
        display: 'none',
        transform: 'translate(-100%, 0%)',
        //opacity: 0.4,
        color: '#cccccc',
    },
    closeIcon: {
        fontSize: '18px',
        padding: '6px 10px',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1,1.1)',
        },
        [theme.breakpoints.down('md')]: {
            padding: '6px 8px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '4px 6px',
        },
    },
}))