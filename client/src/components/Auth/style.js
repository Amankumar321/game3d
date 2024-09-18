import { makeStyles } from '@mui/styles/index.js';

export default makeStyles((theme) => ({
    overlay: {
        position: 'fixed !important',
        left: '0 !important',
        top: '0 !important',
        width: '100% !important',
        height: '100% !important',
        minHeight: '100vh !important',
        backgroundColor: '#e2e2e2 !important',
        opacity: '0.8 !important',
        zIndex: '80 !important',
    },
    paper: {
        position: 'fixed !important',
        marginTop: '150px !important',
        padding: `${theme.spacing(3)} !important`,
        width: '70vw !important',
        zIndex: '90 !important',
        maxWidth: '300px !important',
        minWidth: '200px !important',
        backgroundColor: '#e8e8e8 !important',
        height: '300px !important',
        top: '30% !important',
        boxShadow: '0px 0px 12px #888888 !important',
        left: '50% !important',
        transform: 'translate(-50%,-50%) !important',
    },
    form: {
        height: '100% !important',
        display: 'flex !important',
        flexWrap: 'wrap !important',
        justifyContent: 'space-around !important',
        flexDirection: 'column !important',
    },
    buttonSubmit: {
        marginTop: '20px !important',
        marginBottom: '20px !important',
        backgroundColor: '#282828 !important',
        color: '#e2e2e2 !important',
        '&:hover': {
            backgroundColor: '#383838 !important',
            color: '#e2e2e2 !important',
        },
    },
    labels: {
        color: '#282828 !important',
        marginBottom: '4px !important',
        marginTop: '10px !important',
    },
    inputs: {
        backgroundColor: '#e2e2e2 !important',
        color: '#282828 !important',
    },
    buttonSwitch: {
        backgroundColor: '#e2e2e2 !important',
        color: '#282828 !important',
    },
    closeAuthBtn: {
        position: 'absolute !important',
        top: '0% !important',
        right: '0% !important',
        display: 'flex !important',
        alignItems: 'center !important',
        borderRadius: '4px !important',
        boxSizing: 'border-box !important',
        opacity: '0.4 !important',
        color: '#282828 !important',
    },
    closeIcon: {
        fontSize: '26px !important',
        padding: '6px 10px !important',
        '&:hover': {
            cursor: 'pointer !important',
            transform: 'scale(1.1,1.1) !important',
        },
    },
}));
