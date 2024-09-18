import { makeStyles } from '@mui/styles/index.js';

export default makeStyles((theme) => ({
    mainDiv: {
        height: '100% !important',
        width: '100% !important',
        backgroundColor: '#282828 !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'center !important',
    },
    domain: {
        marginTop: '90px !important',
        display: 'flex !important',
        marginBottom: '20px !important',
        height: '28px !important',
        [theme.breakpoints.down('xs')]: {
            // Add any responsive styles here if needed
        },  
    },
    domainName: {
        color: '#e2e2e2 !important',
        padding: '4px 8px !important',
        margin: '-2px 4px !important',
        cursor: 'pointer !important',
        letterSpacing: '0.6px !important',
        '&:hover': {
            color: 'white !important',
        },
        zIndex: '20 !important',
    },
    chatBox: {
        backgroundColor: '#282828 !important',
        width: '90% !important',
        flexGrow: '1 !important',
        overflow: 'hidden !important',
    },
    bottomChat: {
        width: '100% !important',
        height: '20px !important',
        backgroundColor: '#282828 !important',
    },
    underline: {
        marginTop: '8px !important',
        width: '100% !important',
        height: '2px !important',
        borderRadius: '1px !important',
        backgroundColor: '#e2e2e2 !important',
    }
}));
