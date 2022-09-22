import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Home } from "@pages";

function App() {
  return (
    <>
      <Home />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
