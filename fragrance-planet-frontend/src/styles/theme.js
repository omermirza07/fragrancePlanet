import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#32124F', // Deep Purple for main accents
    },
    secondary: {
      main: '#0A1448', // Dark Blue for secondary accents and buttons
    },
    background: {
      default: '#E6E6FA', // Lavender background for a soft and soothing look
    },
    text: {
      primary: '#1F2676', // Navy Blue for strong contrast in headings
      secondary: '#453F82', // Subtle Violet for supporting and subtext
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.8rem', // Larger headline size for emphasis
    },
    body1: {
      fontSize: '1.4rem', // Slightly larger body text for readability
      lineHeight: 1.8,
    },
    button: {
      fontSize: '1.2rem', // Increased button text size
    },
  },
});

export default theme;