import "./App.css";
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {DateContextProvider} from "../src/context/DateContext";

function App() {
  // const userId = Cookies.get("userId");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) {
      setUserId(id);
    } else {
      navigate("/welcome");
    }
  }, [Cookies.get("userId")]);

  return (
    <DateContextProvider>
      {userId && (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </DateContextProvider>
  );
}

export default App;
