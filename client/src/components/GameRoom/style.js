import { makeStyles } from '@mui/styles/index.js';

export default makeStyles((theme) => ({
    mainContainer: {
        position: 'absolute !important',
        left: '0 !important',
        width: '100% !important',
        minHeight: '100vh !important',
        height: 'fit-content !important',
        backgroundColor: '#e2e2e2 !important',
        color: '#282828 !important',
    },
    gameBox: {
        marginTop: '30px !important',
        display: 'flex !important',
        width: '100% !important',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column !important',
        },
    },
    view: {
        margin: 'auto !important',
        marginTop: '80px !important',
        marginBottom: '20px !important',
        width: '90% !important',
        display: 'flex !important',
        backgroundColor: '#e2e2e2 !important',
        flexDirection: 'column !important',
    },
    header: {
        padding: '0px 20px !important',
        fontSize: '16px !important',
        color: '#282828 !important',
        margin: '10px 0px !important',
        alignItems: 'center !important',
        fontWeight: '500 !important',
        display: 'flex !important',
        letterSpacing: '1px !important',
        justifyContent: 'space-between !important',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column !important',
            justifyContent: 'center !important',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0px !important',
            padding: '0px !important',
            justifyContent: 'center !important',
        },
    },
    roomId: {
        display: 'flex !important',
        backgroundColor: '#eeeeee !important',
        padding: '6px 0px 6px 6px !important',
        borderRadius: '4px !important',
        border: '1px dashed #aaaaaa !important',
        alignItems: 'baseline !important',
        [theme.breakpoints.down('xs')]: {
            fontSize: '16px !important',
        },
    },
    roomIdFirst: {
        fontSize: '20px !important',
        paddingRight: '10px !important',
        fontWeight: '600 !important',
        alignItems: 'baseline !important',
        letterSpacing: '0.4px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px !important',
        },
    },
    roomIdSecond: {
        fontSize: '16px !important',
        paddingRight: '10px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'baseline !important',
        letterSpacing: '1px !important',
        [theme.breakpoints.down('sm')]: {
            letterSpacing: '0.8px !important',
        },
    },
    copyIcon: {
        width: '35px !important',
        height: '35px !important',
        fontSize: '20px !important',
        marginLeft: '10px !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        borderRadius: '4px !important',
        border: '1px solid #aaaaaa !important',
        color: '#282828 !important',
        backgroundColor: '#e8e8e8 !important',
        boxSizing: 'border-box !important',
        '&:hover': {
            cursor: 'pointer !important',
            backgroundColor: '#d2d2d2 !important',
            border: '1px solid #bbbbbb !important',
        },
    },
    roomSettings: {
        display: 'flex !important',
        color: '#282828 !important',
        [theme.breakpoints.down('md')]: {
            marginTop: '20px !important',
            display: 'flex !important',
            minWidth: '70% !important',
            justifyContent: 'space-around !important',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px !important',
            flexDirection: 'column !important',
        },
    },
    settingForms: {
        display: 'flex !important',
        alignItems: 'baseline !important',
        justifyContent: 'center !important',
        boxSizing: 'border-box !important',
        paddingLeft: '20px !important',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px !important',
        },
    },
    settingBtn: {
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
    },
    formType: {
        width: '180px !important',
        paddingRight: '20px !important',
        marginRight: '20px !important',
        paddingLeft: '0px !important',
        boxSizing: 'border-box !important',
        [theme.breakpoints.up('lg')]: {
            width: '180px !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '120px !important',
        },
        [theme.breakpoints.down('xs')]: {
            flexGrow: '1 !important',
            maxWidth: '180px !important',
            paddingRight: '20px !important',
        },
    },
    roomBtn: {
        margin: '0px 10px !important',
        '&:hover': {
            backgroundColor: '#282828 !important',
            color: '#e2e2e2 !important',
        },
    },
    publicSwitch: {
        marginRight: '20px !important',
        [theme.breakpoints.down('xs')]: {
            marginRight: '10px !important',
        },
    },
    playerDiv: {
        marginTop: '20px !important',
        width: '100% !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
    },
    playSwitchOne: {
        display: 'absolute !important',
        marginLeft: '20px !important',
        [theme.breakpoints.down('xs')]: {
            display: 'none !important'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none !important'
        },
    },
    playSwitchTwo: {
        marginRight: '30px !important',
        display: 'none !important',
        [theme.breakpoints.up('lg')]: {
            display: 'block !important',
        },
    },
    playSwitchThree: {
        marginLeft: '20px !important',
        display: 'none !important',
        [theme.breakpoints.down('xs')]: {
            display: 'block !important',
        },
    },
    roomIdWrap: {
        display: 'flex !important',
        alignItems: 'center !important',
    },
    noGameDiv: {
        width: '100% !important',
        display: 'flex !important',
        flexWrap: 'wrap !important',
        justifyContent: 'space-around !important',
    },
    instructionDiv: {
        border: '1px solid #cccccc !important',
        backgroundColor: '#e8e8e8 !important',
        borderRadius: '6px !important',
        paddingBottom: '12px !important',
        width: '31% !important',
        margin: '20px 0px !important',
        [theme.breakpoints.down('md')]: {
            width: '48% !important',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90% !important',
            margin: '10px 0px !important',
        },
    },
    instructionHead: {
        fontSize: '24px !important',
        fontWeight: '500 !important',
        margin: '16px !important',
        [theme.breakpoints.down('md')]: {
            fontSize: '22px !important',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px !important',
        },
    },
    instructionBody: {
        margin: '16px 16px !important',
        color: '#484848 !important',
        lineHeight: '1.4 !important',
        letterSpacing: '0.4px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px !important',
        },
    },
}));
