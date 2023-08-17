import Class from "./CalculatorResults.module.css";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import {updateBudget} from "../../apis/userApi";

function CalculatorResults({results}) {
  const {setBudget} = useContext(GlobalContext);
  const updateHandler = async () => {
    setBudget(parseInt(results));
    const success = await updateBudget(parseInt(results));
  };

  return (
    <div className={Class.container}>
      <header>
        <h4>Your custom budget</h4>
        <h1>{results} cals</h1>
      </header>
      <section>
        <button onClick={updateHandler}>Use Budget</button>
        <button>Re-do</button>
      </section>
      <sub>
        With the information you've input we've calculated a caloric budget custom tuned to your needs and goals. Please
        speak to your health care provider if you have any health issues.
      </sub>
    </div>
  );
}

export default CalculatorResults;
