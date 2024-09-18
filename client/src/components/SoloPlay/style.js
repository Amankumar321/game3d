import { makeStyles } from '@mui/styles/index.js';

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'fixed !important',
        display: 'none !important',
        left: '0 !important',
        top: '63px !important',
        width: '100vw !important',
        alignSelf: 'center !important',
        overflow: 'auto !important',
        zIndex: '10 !important',
        height: 'calc(100% - 63px) !important',
        [theme.breakpoints.down('xs')]: {
            top: '55px !important',
            height: 'calc(100% - 55px) !important',
        },
    },
    closeIcon: {
        fontSize: '26px !important',
        padding: '6px 10px !important',
    },
    closeBox: {
        position: 'absolute !important',
        top: '20px !important',
        right: '0px !important',
        display: 'flex !important',
        fontSize: '20px !important',
        marginRight: '26px !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        zIndex: '20 !important',
        boxSizing: 'border-box !important',
        opacity: '0.4 !important',
        color: '#282828 !important',
        [theme.breakpoints.down('xs')]: {
            marginRight: '20px !important',
        },
        '&:hover': {
            cursor: 'pointer !important',
            opacity: '0.6 !important',
        },
    },
    frame: {
        position: 'absolute !important',
        borderWidth: '0px !important',
        top: '0px !important',
        left: '0px !important',
        width: '100% !important',
        height: '100% !important',
        boxSizing: 'border-box !important',
    },
}));
