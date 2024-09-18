import { makeStyles } from '@mui/styles/index.js';

export default makeStyles((theme) => ({
    mainDiv: {
        position: 'fixed !important',
        left: '50% !important',
        transform: 'translate(-50%, 0%) !important',
        top: '80px !important',
        zIndex: '1000 !important',
        textAlign: 'center !important',
        width: '40vw !important',
        minWidth: '300px !important',
        maxWidth: '900px !important',
        backgroundColor: '#282828 !important',
        color: '#cccccc !important',
        padding: '20px 30px !important',
        display: 'flex !important',
        letterSpacing: '0.6px !important',
        alignItems: 'center !important',
        boxSizing: 'border-box !important',
        borderRadius: '4px !important',
        lineHeight: '1.4 !important',
        boxShadow: '0px 0px 16px #666666 !important',
        [theme.breakpoints.down('md')]: {
            padding: '18px 26px !important',
            fontSize: '15px !important',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '16px 16px !important',
            fontSize: '14px !important',
        },
    },
    closeBtnDiv: {
        position: 'fixed !important',
        display: 'flex !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        boxSizing: 'border-box !important',
        zIndex: '1001 !important',
        display: 'none !important',
        transform: 'translate(-100%, 0%) !important',
        color: '#cccccc !important',
    },
    closeIcon: {
        fontSize: '18px !important',
        padding: '6px 10px !important',
        '&:hover': {
            cursor: 'pointer !important',
            transform: 'scale(1.1,1.1) !important',
        },
        [theme.breakpoints.down('md')]: {
            padding: '6px 8px !important',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '4px 6px !important',
        },
    },
}));
