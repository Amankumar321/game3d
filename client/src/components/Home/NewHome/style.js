import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100vw',
        //minHeight: 'fit-content',
        height: '100%',
        //overflow: 'auto',
        //paddingTop: '50px',
        color: '#282828',
        backgroundColor: '#e2e2e2',
    },
    topDiv: {
        position: 'relative',
        backgroundColor: '#282828',
        marginTop: '63px',
        //backgroundColor: 'red',
        width: '100vw',
        height: `calc(100% - 63px)`,
        [theme.breakpoints.down('xs')]: {
            marginTop: '55px',
            height: `calc(100% - 55px)`,
        },
    },
    coverFrame: {
        width: '100%',
        border: 'none',
        borderWidth: '0px',
        height: '100%',
    },
    content: {
        position: 'absolute',
        width: '60%',
        height: `calc(${window.innerHeight}px - 180px)`,
        //backgroundColor: 'green',
        top: 0,
        left: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '70%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    phrase: {
        width: '80%',
        margin: '0px auto',
        fontSize: '78px',
        textAlign: 'center',
        lineHeight: 0.9,
        letterSpacing: '0.4px',
        //textShadow: '-1px -1px 0 #666666, 1px -1px 0 #666666, -1px 1px 0 #666666, 1px 1px 0 #666666',
        fontWeight: 700,
        color: '#e2e2e2',
        marginBottom: '50px',
        minWidth: '300px',
        [theme.breakpoints.down('md')]: {
            fontSize: '68px',
            marginBottom: '38px',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '28px',
            fontSize: '42px',
        },
    },
    login: {
        margin: '0px auto',
        maxWidth: '260px',
        display: 'flex',
        justifyContent: 'space-around',
        width: '90%',
    },
    desc: {
        margin: '0px auto',
        width: '70%',
        fontSize: '28px',
        color: '#aaaaaa',
        marginBottom: '50px',
        textAlign: 'center',
        letterSpacing: '0.6px',
        [theme.breakpoints.down('md')]: {
            letterSpacing: '0.5px',
            fontSize: '24px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            letterSpacing: '0.3px',
            fontSize: '20px',
        },
    },
    buttonSignUp: {
        color: '#282828',
        //fontWeight: 500,
        fontSize: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        letterSpacing: '1px',
    },
    buttonLogin: {
        color: '#e2e2e2',
        fontSize: '16px',
        letterSpacing: '1px',
        //fontWeight: 600,
        border: '2px solid #888888',
        paddingLeft: '16px',
        paddingRight: '16px',
        '&:hover': {
            backgroundColor: '#e2e2e2',
            border: '2px solid #e2e2e2',
            color: '#282828',
        }
    },
    secondDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e2e2e2',
    },
    checkoutGames: {
        width: '90%',

    },
    heading: {
        width: '100%',
        textAlign: 'center',
        margin: '60px auto',
        fontSize: '56px',
        letterSpacing: '2px',
        //textShadow: '-1px -1px 0 #666666, 1px -1px 0 #666666, -1px 1px 0 #666666, 1px 1px 0 #666666',
        fontWeight: 700,
        color: '#282828',
        [theme.breakpoints.down('md')]: {
            letterSpacing: '1px',
            fontSize: '48px',
            marginBottom: '50px',
        },
        [theme.breakpoints.down('sm')]: {
            letterSpacing: '0.4px',
            fontSize: '36px',
            marginBottom: '40px',
        },
    },
    checkoutWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    checkoutCard: {
        marginBottom: '60px',
        width: '60%',
        display: 'flex',
        borderRadius: '6px',
        overflow: 'hidden',
        borderWidth: '1px 1px 1px 1px',
        borderColor: '#aaaaaa',
        borderStyle: 'solid',
        [theme.breakpoints.down('md')]: {
            width: '80%',
            marginBottom: '50px',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width: '85%',
            marginBottom: '45px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: '40px',
        },
    },
    checkoutNameOuter: {
        position: 'relative',
        width: '30%',
        padding: '16px',
        textAlign: 'center',
        boxSizing: 'border-box',
        letterSpacing: '1.2px',
        fontSize: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#282828',
        color: '#cccccc',
        [theme.breakpoints.down('md')]: {
            letterSpacing: '1px',
            fontSize: '26px'
        },
        [theme.breakpoints.down('sm')]: {
            letterSpacing: '0.6px',
            fontSize: '22px',
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            letterSpacing: '0.4px',
            fontSize: '20px'
        },
    },
    checkoutGifDiv: {
        width: '70%',
        height: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    checkoutGif: {
        width: '100%',
        height: '100%',
    },
    checkoutBtn: {
        marginBottom: '20px',
        padding: '12px 20px',
        color: '#cccccc',
        letterSpacing: '0.6px',
        border: '2px solid #666666',
        backgroundColor: '#282828',
        '&:hover': {
            borderColor: '#aaaaaa'
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '0px',
            padding: '8px 16px',
            marginTop: '20px',
        },
    }
}))

