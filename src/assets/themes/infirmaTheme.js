
// ✅ RIGHT
import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';

//#F7FAFC, 7F8082
export const theme = createTheme({
   spacing: 8,
  zIndex: {
    
    snackbar: 2700,
    modal: 2600,
    tooltip: 3000,
  },
  palette: {
    type: "light", //dark,light
    brandPrimary: {
      dark :"#003761",
      //dark: "#178590",
      main: "#335F81",
      light: "#6687A0",
      liter: "#99AFC0",
      tooLiter: "#CCD7DF",
      contrastText: "#fff",
    },
    otherColors: {
      dark: "#E1E7F3",
      main: "#999696",
      light: "#F7FAFC",
      liter: "#7F8082",
      tooLiter: "#E1E7F3",
      contrastText: "#ED7172",
      lighter:"#F9FAFC",
      tooLighter: "#FFF8E5",
    },
    tagColorsFont: {
      dark: "#FF5A3B",
      main: "#F40505",
      light: "#7C007C",
      liter: "#25B5BD",
      tooLiter: "#0D7223",
      contrastText: "#05ADE2",
      tooLighter:"#16C79A",
      lighter: "#FD8C04",
    },
    tagColorsBg: {
      dark: "#F9E4E0",
      main: "#FEDADA",
      light: "#ECD9EC",
      liter: "#DFF4F5",
      tooLiter: "#CDFBD7",
      contrastText: "#DAF3FB",
      tooLighter:"#DCF7F0",
      lighter: "#FFEEDA",
    },
    genderColor: {
      femaleColor: "#F25287",
      maleColor: "#02B0F0",
      unknownGenderColor: "#626460",
      avatarfemaleBg: "#F8A8C3",
      avatarmaleBg: "#80D7F7",
      femaleBg: "#F7EEF4",
      maleBg: "#E6F4FC",
      unknownGenderBg: "#F7F7F7",
    },
    genderColorMain: {
      femaleFont: "#F25287",
      maleFont: "#02B0F0",
      femaleBg: "#F8A8C3",
      maleBg: "#80D7F7",
      femaleBgLi: "#F7EEF4",
      maleBgLi: "#E6F4FC",
      unknownFont: "#303030",
      unknownBg: "#EFEFEF",
    },
    textColor: {
      main: "#ffffff",
    },
    primary: {
      dark: "#0c578cff",
      main: "#63A7D6",
      light: "#96C3E3",
      lighter: "#E1E7F3",
      liter: "#CBE1F1",
      tooLiter: "#F7FAFD",
      contrastText: "#fff",
    },
    reds: {
      dark: "#F40505",
      main: "#FF5A3B",
      light: "#FF886A",
      liter: "#FFB19A",
      tooLiter: "#FFF5F2",
      contrastText: "#fff",
    },
    secondary: {
      dark: "#ba000d",
      main: "#2F89C8",
      light: "#ff7961",
      liter: "#B0D2EA",
      contrastText: "#000",
    },
    grey: {
      dark: "#000000",
      main: "#303030",
      light: "#5E5E5E",
      liter: "#919191",
      tooLiter: "#F8F7F7",
      contrastText: "#fff",
    },
    lightGrey: {
      dark: "#686565",
      darker: "#CFCDCD",
      main: "#BDBBBB",
      light: "#AEAEAE",
      liter:"#EEEEEE"
    },
    darkGreen: {
      dark: "#0D7223",
      darker: '#068161',
      main: "#269C40",
      light: "#5FCF77",
      liter: "#CDFBD7",
      tooLiter: "#EBFFEF",
      contrastText: "#fff",
    },
    green: {
      dark: "#73BA42",
      main: "#8AC065",
      light: "#AFE18D",
      liter: "#D0FDB1",
      tooLiter: "#F1FFE8",
      contrastText: "#fff",
    },

    peacockBlue: {
      dark: "#25B5BD",
      main: "#40D9E1",
      light: "#6CE6ED",
      liter: "#AEFBFF",
      tooLiter: "#E5FEFF",
      contrastText: "#fff",
    },

    lightGray: {
      dark: "#5A5656",
      main: "#626460",
      light: "#B0A8A8",
      liter: "#D0D0D0",
      tooLiter: "#E7E7E7",
      contrastText: "#F7F7F7",
    },
    goldenYellow: {
      dark: "#FFBF00",
      main: "#F8CF55",
      light: "#FDE08A",
      liter: "#FFF890",
      tooLiter: "#FFFBD7",
      contrastText: "#FFFFFF",
    },
    purple: {
      dark: "#644CF8",
      main: "#8572FF",
      light: "#9E8EFF",
      lighter: '#7C007C',
      liter: "#B8ACFF",
      tooLiter: "#E6E2FF",
      contrastText: "#F8F6FF",
    },
    lightGrays: {
      dark: "#5A5656",
      main: "#626460",
      light: "#B0A8A8",
      liter: "#D0D0D0",
      tooLiter: "#E7E7E7",
      contrastText: "#F7F7F7",
    },

    disabledColors: {
      bgColor:"#E2E5E6",
      fontColor:"#B0A8A8",
    },

    blue: {
      dark: '#0F52BA',
      main: '#02B0F0',
      liter: '#E0EDF7',
      light: '#05ADE2',
      tooLiter: '#C7D2E9',
      contrastText:"#2F89C80A",
    },

    lightBlue: {
      dark: '#DBEFFD',
      light: "#D9EAF5",
      lighter:"#B9EDFE",
      liter: "#E2F8FF",
      tooLiter: '#F5F5F5'
    },

    blueChip:{
      dark: "#163DC7",
      main: "#FF7B54",
      tooLiter: "#D4EAFE",
      light:"#11D8E3",
    },

    orange: {
      dark: '#F77F00',
      main: "#1F9AB1",
      light: '#f77f004f',
    },

    black: {
      main:"#746F6F",
      light: "#383838",
      Liter:"#5E5E5E",
      tooLiter:"#E0E0E0",
      contrastText:"#C1C1C1"
    },

    doughnutCharts: {
      lightblue: "#35CAE6",
      green: "#A5C345",
      yellow: "#FFBE0B",
      purple: "#93329E",
      blue: "0C8FF3",
      darkBlue:"#0C8FF3",
      orange:"#FF7B54",
    },
    lightGreen: {
      dark: "#16C79A",
    },

    background: {
      textField: "#ffffff",
    },

    border:{
      grey: '#C4C4C4',
      blue: "#C1D6EB",
      lightash: '#ACACAC',
      lightGrey:"#E2E2E2",
      lightBlue:"#D9EAF5",
      darkBlue:"#28377A",
      ash:"#5B5858",
      lightGray:"#DFE5F1",
      darkGray:"#D9DFEB",
      red:"#FA2C2C"
    }
  },

  //background:"#fff"
  typography: {
    smallFontSize7: 7,
    smallFontSize9: 9,
    smallFontSize10: 10,
    fontSize11: 11,
    smallFontSize: 12,
    fontSizeMin: 12,
    fontSize13: 13,
    fontSize: 14,
    fondSize15:15,
    fondSize22:22,
    fondSize30:30,
    fondSize32:32,
    h6: {
      fontSize: 16,
    },
    h5: {
      fontSize: 18,
    },
    h4: {
      fontSize: 20,
    },
    h3: {
      fontSize: 24,
    },
    h2: {
      fontSize: 28,
    },
    h1: {
      fontSize: 34,
    },
    fontWeight: {
      weight1: 200,
      weight2: 300,
      weight3: 400,
      weight4: 500,
      weight5: 700,
      weight6: 900,
    },
  },

  customSpacing: {
    padding: {
      padding1: 5,
      padding2: 10,
      padding3: 15,
      padding4: 20,
    },
    borderRadius: {
      radius1: 2,
      radius2: 3,
      radius3: 5,
      radius4: 7,
      radius5: 10,
      radius6: 16,
    }
  },

  buttons: {
    borderRadius: 5,
    width: {
      small: 75,
      medium: 150,
      large: 300,
      modalMedium:100,
      mediumSmall:96,
      extraLarge:255
    },
    height: {
      medium: 35,
    },
  },

  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "transperant"
        }
      }
    },
    MuiButtonBase: {
      root: {
        "&:focus": {
          outline: "none !important",
        }
      },
    },
    MuiButton: {
      root: {
        "&.Mui-disabled":{
          // color:"#fff"
        }
      },
    },
   
  }

});