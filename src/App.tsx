import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { HomePage } from "@pages";

function App() {
  return (
    <>
      <HomePage />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;

