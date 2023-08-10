import {createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [date, setDate] = useState("...");
  useEffect(() => {
    const dayDate = Cookies.get("dayDate");
    if (dayDate) {
      const year = new Date().getFullYear();
      const date = new Date(year, 0, dayDate).toLocaleDateString();

      setDate(date);
    }
  }, []);
  return <GlobalContext.Provider value={{date, setDate}}>{props.children}</GlobalContext.Provider>;
}
