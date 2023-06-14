import "./App.css";
import {Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
function App() {
  return (
    <>
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}

export default App;
