import "./style/App.css";
import AppRouter from "./routes/router";
import { AppProvider } from "./context/appContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AppProvider>
      <AppRouter />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
