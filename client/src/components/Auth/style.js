import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    overlay: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#e2e2e2',
        opacity: 0.8,
        zIndex: 80,
    },
    paper: {
        position: 'fixed',
        marginTop: '150px',
        padding: theme.spacing(3),
        width: '70vw',
        zIndex: 90,
        maxWidth: '300px',
        minWidth: '200px',
        backgroundColor: '#e8e8e8',
        height: '300px',
        top: '30%',
        boxShadow: '0px 0px 12px #888888',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    form: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    buttonSubmit: {
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: '#282828',
        color: '#e2e2e2',
        '&:hover': {
            backgroundColor: '#383838',
            color: '#e2e2e2',
        },
    },
    labels: {
        color: '#282828',
        marginBottom: '4px',
        marginTop: '10px',
    },
    inputs: {
        backgroundColor: '#e2e2e2',
        color: '#282828',
    },
    buttonSwitch: {
        backgroundColor: '#e2e2e2',
        color: '#282828',
    },
    closeAuthBtn: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        display: 'flex',
        alignItems: 'center',
        //backgroundColor: '#cccccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        opacity: 0.4,
        color: '#282828',
    },
    closeIcon: {
        fontSize: '26px',
        padding: '6px 10px',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1,1.1)',
        },
    },
}));