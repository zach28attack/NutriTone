import {createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";

export const DateContext = createContext();

export function DateContextProvider(props) {
  const [date, setDate] = useState("...");
  useEffect(() => {
    const dayDate = Cookies.get("dayDate");
    if (dayDate) {
      const year = new Date().getFullYear();
      const date = new Date(year, 0, dayDate).toLocaleDateString();

      setDate(date);
    }
  }, []);
  return <DateContext.Provider value={{date, setDate}}>{props.children}</DateContext.Provider>;
}
