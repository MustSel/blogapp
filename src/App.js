import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { grey, blueGrey } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

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
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Navbar />
            <AppRouter />
          </Provider>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
