import { makeStyles } from '@mui/styles';

import login_page_background from '../../../../assets/image/backgroundImage.png'

export const newLoginStyle = makeStyles((theme) => ({

    outerDiv: {
        height: '100vh', 
        backgroundImage: `url(${login_page_background})`,
        backgroundSize: "cover", 
        backgroundPosition: "center"
    },

    /**
     * 
     * The welcome heading on the login page 
     * 
     */
    welcomWordTypo: {
        textAlign: 'center',
        font: 'normal normal medium 20px / 26px Roboto',
        letterSpacing: '0px',
        color: '#5B5B5B',
        opacity: '1',
        fontWeight:500,
        paddingTop: '12px',
        fontSize:"25px"
    },
    /**
     * 
     * Login Boxe's
     * 
     */
    outerPaperMiddle: {
        position:"relative",
        left:"224px",
        // height: '25rem',
        width: '25rem',
        // margin:"20px",
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '20px 20px 20px 20px',
            display:"flex",
            justifyContent:"center",
            left:"22px",
        },
    },

    paperMiddle: {
        height: '35rem',
        width: '28rem',
        backgroundColor: '#def1eed2',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            height: '30rem',
            width: '23rem',
        },
    },
    exoticImage: {
        height: '140px',
        position: 'relative',
        width: '180px',
         [theme.breakpoints.down('sm')]: {
            width: '15rem',
            height: '7rem',
        },
    },
    /**
     * 
     * Input components section
     * 
     */
    formControl: {
        width:"270px",
    },
    inputLables: {
        fontFamily:"Robot", 
        fontSize:"16px", 
        fontWeight:400, 
        color:"#0F4674"
    },
    userName: {
        width: '70%',
    },
    password: {
        width: '70%',
        position: 'relative',
        left: '2%',
    },

    /**
     * 
     * Show / Hide password eye icon
     * 
     */

    eyeIcon: {
        position: 'relative',
        top: '12px',
        right: '1rem',
        cursor: 'pointer',
    },

    /**
     * 
     * Remember me & forgot password section
     * 
     */

    rememberMe: {
        position: 'relative',
        bottom: '26%',
        fontSize: '12px',
        right: '7%',
        display: "table",
    },
    forgetPassWordLabel: {
        fontSize: '14px',
        color: '#178BEC',
    },
    forgotPass: {
        position: 'relative',
        bottom: '16%',
        left: '5%',
    },

    /**
     * 
     * Validation message on login error
     * 
     */

    loginValidationMessage: {
        fontFamily: "roboto",
        fontSize: '16px',
        color: 'red',
    },

    /**
     * 
     * Display style of the progress bar 
     * after login button is clicked 
     * 
     */

    progressBar: {
        padding: '0% 5%',
        position: 'relative',
        bottom: '15%',
    }
}));
