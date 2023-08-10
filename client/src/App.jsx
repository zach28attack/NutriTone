import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {GlobalContextProvider} from "./context/GlobalContext";

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
    <GlobalContextProvider>
      {userId && (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </GlobalContextProvider>
  );
}

export default App;
