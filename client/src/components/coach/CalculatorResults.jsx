import Class from "./CalculatorResults.module.css";

function CalculatorResults() {
  return (
    <div className={Class.container}>
      <header>
        <h4>Your custom budget</h4>
        <h1>1800 cals</h1>
      </header>
      <section>
        <button>Use Budget</button>
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
