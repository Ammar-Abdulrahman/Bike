import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "@Routes/App.routes";
import { QueryClient, QueryClientProvider } from "react-query";
//import AppLoader from "@Components/Loader/AppLoader";
import { StyledEngineProvider } from "@mui/material/styles";
import ThemeProvider from "../Theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <StyledEngineProvider injectFirst>
        <Suspense fallback={<></>}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer position="bottom-right" />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Suspense>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
