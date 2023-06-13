import "./App.css";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <h1>App layout</h1>
      <Outlet />
    </>
  );
}

export default App;
