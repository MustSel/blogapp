import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { grey, blueGrey } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { CssBaseline, Box } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey["900"],
      },
      secondary: {
        main: blueGrey["900"],
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <AppRouter />
            </Box>
            <Footer sx={{ mt: 5, mb: 2 }} />
          </Box>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
