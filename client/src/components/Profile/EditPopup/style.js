import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'absolute',
        left: 0,
        zIndex: 20,
        width: '100%',
        height: '100vh',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#e2e2e2',
        opacity: 0.8,
    },
    centered: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxShadow: '0px 1px 4px #888888',
        borderRadius: '6px',
        boxSizing: 'border-box',
        backgroundColor: '#e8e8e8',
        transform: 'translate(-50%, -50%)',
    },
    header: {
        width: '100%',
        padding: '10px 20px',
        boxSizing: 'border-box',
        borderBottom: '1px solid #aaaaaa',
        fontSize: '20px',
        fontWeight: '500',
        
    },
    selectDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    statusEditDiv: {
        padding: '20px',
        alignItems: 'center',
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        justifyContent: 'center',
    },
    aboutEditDiv: {
        padding: '20px',
        alignItems: 'center',
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        justifyContent: 'center',
    },
    select: {
        width: '150px',
        margin: '30px 0px',
        boxSizing: 'border-box',
    },
    statusInput: {
        width: '100%',
        height: '60px',
        minWidth: '200px',
        fontSize: '16px',
        border: '1px solid #aaaaaa',
        outline: 'none',
        padding: '8px',
        borderRadius: '4px',
        '&:hover &:active': {
            border: 'none',
            outline: 'none'
        },
    },
    aboutInput: {
        width: '400px',
        minWidth: '200px',
        height: '120px',
        border: '1px solid #aaaaaa',
        fontSize: '16px',
        padding: '8px',
        outline: 'none',
        borderRadius: '4px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '&:hover &:active': {
            border: 'none',
            outline: 'none',
        },
    },
    buttonDiv: {
        padding: '0px 0px 20px 0px',
        width: '300px',
        maxWidth: '90vw',
        display: 'flex',
        justifyContent: 'space-around',

    },
    buttonSave: {
        width: '40%',
        backgroundColor: '#282828',
        color: '#e2e2e2',
        '&:hover': {
            backgroundColor: '#383838',
            color: '#e2e2e2',
        },
    },
    buttonCancel: {
        width: '40%',
        backgroundColor: '#e2e2e2',
        color: '#282828',
    },
    menuPaper: {
        maxHeight: '200px',
    },
    closeEdit: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        boxSizing: 'border-box',
        opacity: 0.4,
        color: '#282828',
    },
    closeIcon: {
        fontSize: '26px',
        padding: '6px 10px',
        //textShadow: '0px 0px 2px #aaaaaa',
        //textShadow: '-1px -1px 0 #888888, 1px -1px 0 #888888, -1px 1px 0 #888888, 1px 1px 0 #888888',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1,1.1)',
        },
    },

}))

