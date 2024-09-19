import { makeStyles } from "@material-ui/core/index.js";

export default makeStyles((theme) => ({
    mainDiv: {
        height: '100%',
        width: '100%',
        backgroundColor: '#282828',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    domain: {
        marginTop: '90px',
        display: 'flex',
        marginBottom: '20px',
        height: '28px',
        [theme.breakpoints.down('xs')]: {
             
        },  
    },
    domainName: {
        color: '#e2e2e2',
        padding: '4px 8px',
        margin: '-2px 4px',
        cursor: 'pointer',
        letterSpacing: '0.6px',
        '&:hover': {
            color: 'white',
        },
        zIndex: 20,
    },
    chatBox: {
        backgroundColor: '#282828',
        width: '90%',
        flexGrow: 1,
        overflow: 'hidden',
    },
    bottomChat: {
        width: '100%',
        height: '20px',
        backgroundColor: '#282828',
    },
    underline: {
        marginTop: '8px',
        width: '100%',
        height: '2px',
        borderRadius: '1px',
        backgroundColor: '#e2e2e2',
    }
}))