import { makeStyles } from "@material-ui/core/index.js";

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'absolute',
        left: 0,
        width: '100%',
        minHeight: '100vh',
        height: 'fit-content',
        backgroundColor: '#e2e2e2',
        color: '#282828'
    },
    gameBox: {
        marginTop: '30px',
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    view: {
        margin: 'auto',
        marginTop: '80px',
        marginBottom: '20px',
        width: '90%',
        display: 'flex',
        backgroundColor: '#e2e2e2',
        flexDirection: 'column',
    },
    header: {
        padding: '0px 20px',
        fontSize: '16px',
        color: '#282828',
        margin: '10px 0px',
        alignItems: 'center',
        fontWeight: '500',
        display: 'flex',
        letterSpacing: '1px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0px',
            padding: '0px',
            justifyContent: 'center',
        },
    },
    roomId: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        padding: '6px 0px 6px 6px',
        borderRadius: '4px',
        border: '1px dashed #aaaaaa',
        alignItems: 'baseline',
        [theme.breakpoints.down('xs')]: {
            fontSize: '16px',
        },
    },
    roomIdFirst: {
        fontSize: '20px',
        paddingRight: '10px',
        fontWeight: '600',
        alignItems: 'baseline',
        letterSpacing: '0.4px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
        
    },
    roomIdSecond: {
        fontSize: '16px',
        paddingRight: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        letterSpacing: '1px',
        [theme.breakpoints.down('sm')]: {
            letterSpacing: '0.8px',
        },
    },
    copyIcon: {
        width: '35px',
        height: '35px',
        fontSize: '20px',
        marginLeft: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        border: '1px solid #aaaaaa',
        color: '#282828',
        backgroundColor: '#e8e8e8',
        boxSizing: 'border-box', 
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#d2d2d2',
            border: '1px solid #bbbbbb',
        },
    },
    roomSettings: {
        display: 'flex',
        color: '#282828',
        [theme.breakpoints.down('md')]: {
            marginTop: '20px',
            display: 'flex',
            minWidth: '70%',
            justifyContent: 'space-around',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px',
            flexDirection: 'column',
        },
    },
    settingForms: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        boxSizing: 'border-box',
        paddingLeft: '20px',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px',
        },
    },
    settingBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formType: {
        width: '180px',
        paddingRight: '20px',
        marginRight: '20px',
        paddingLeft: '0px',
        boxSizing: 'border-box',
        [theme.breakpoints.up('lg')]: {
            width: '180px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '120px',
        },
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
            maxWidth: '180px',
            paddingRight: '20px',
        },
    },
    roomBtn: {
        margin: '0px 10px',
        '&:hover': {
            backgroundColor: '#282828',
            color: '#e2e2e2',
        },
    },
    publicSwitch: {
        marginRight: '20px',
        [theme.breakpoints.down('xs')]: {
            marginRight: '10px',
        },
    },
    playerDiv: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playSwitchOne: {
        display: 'absolute',
        marginLeft: '20px',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        },
    },
    playSwitchTwo: {
        marginRight: '30px',
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    playSwitchThree: {
        marginLeft: '20px',
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    roomIdWrap: {
        display: 'flex',
        alignItems: 'center',
    },
    noGameDiv: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    instructionDiv: {
        border: '1px solid #cccccc',
        backgroundColor: '#e8e8e8',
        borderRadius: '6px',
        paddingBottom: '12px',
        width: '31%',
        margin: '20px 0px',
        [theme.breakpoints.down('md')]: {
            width: '48%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            margin: '10px 0px',
        },
    },
    instructionHead: {
        fontSize: '24px',
        fontWeight: '500',
        margin: '16px',
        [theme.breakpoints.down('md')]: {
            fontSize: '22px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        },
    },
    instructionBody: {
        margin: '16px 16px',
        color: '#484848',
        lineHeight: '1.4',
        letterSpacing: '0.4px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },

}))

