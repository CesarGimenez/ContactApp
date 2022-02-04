import react from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Navigation } from "./Components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
