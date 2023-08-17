import Class from "./Calculator.module.css";
import {useState} from "react";
import CalculatorResults from "./CalculatorResults";

function Calculator() {
  const [heightMetric, setHeightMetric] = useState("Feet");
  const [weightMetric, setWeightMetric] = useState("Pounds");
  const [sex, setSex] = useState("Male");

  const [ageInput, setAgeInput] = useState(0);
  const [primaryHeightInput, setPrimaryHeightInput] = useState(0);
  const [secondaryHeightInput, setSecondaryHeightInput] = useState(0);
  const [weightInput, setWeightInput] = useState(0);
  const [intensity, setIntensity] = useState();
  const [results, setResults] = useState(0);
  const [resultsActive, setResultsActive] = useState(false);

  const ageInputHandler = (input) => {
    setAgeInput(input.target.value);
  };
  const primaryHeightInputInputHandler = (input) => {
    setPrimaryHeightInput(input.target.value);
  };
  const secondaryHeightInputInputHandler = (input) => {
    setSecondaryHeightInput(input.target.value);
  };
  const weightInputHandler = (input) => {
    setWeightInput(input.target.value);
  };
  const formulaHandler = (input) => {
    setWeightInput(input.target.value);
  };
  const activityHandler = (input) => {
    setWeightInput(input.target.value);
  };

  const heightClickHandler = (e) => {
    e.preventDefault();
    e.target.name === "Feet" ? setHeightMetric("Feet") : setHeightMetric("Meters");
  };
  const weightClickHandler = (e) => {
    e.preventDefault();
    e.target.name === "Pounds" ? setWeightMetric("Pounds") : setWeightMetric("Kilo");
  };
  const sexHandler = (e) => {
    e.preventDefault();
    e.target.name === "Male" ? setSex("Male") : setSex("Female");
  };

  const intensityHandler = (e) => {
    e.preventDefault();
    e.target.name === "Normal"
      ? setIntensity("Normal")
      : e.target.name === "Accelerated"
      ? setIntensity("Accelerated")
      : setIntensity("Extreme");
  };

  const HBFormula = () => {
    // MEN
    // BMR = (13.397 × weight in kg) + (4.799 × height in cm) – (5.677 × age in years) + 88.362
    // WOMEN
    // BMR = (9.247 × weight in kg) + (3.098 × height in cm) – (4.330 × age in years) + 447.593
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setResultsActive(true);
    HBFormula();
  };

  return (
    <div className={Class.container}>
      <form onSubmit={submitHandler}>
        <div className={Class.age}>
          <label>Age</label>
          <input type="text" placeholder="years" onChange={ageInputHandler} />
        </div>

        <div className={Class.sex}>
          <label>Sex</label>
          <section className={Class.buttons}>
            <button onClick={sexHandler} className={sex === "Male" && Class.buttonActive} name="Male">
              Male
            </button>
            <button onClick={sexHandler} className={sex === "Female" && Class.buttonActive} name="Female">
              Female
            </button>
          </section>
        </div>

        <div className={Class.height}>
          <label>Height</label>
          <section className={Class.buttons}>
            <button onClick={heightClickHandler} className={heightMetric === "Feet" && Class.buttonActive} name="Feet">
              Imperial
            </button>
            <button
              onClick={heightClickHandler}
              className={heightMetric === "Meters" && Class.buttonActive}
              name="Meters"
            >
              Metric
            </button>
          </section>

          <div className={Class.heightInputSection}>
            <input
              type="text"
              placeholder={`${heightMetric === "Feet" ? "Feet" : "Meters"}`}
              onChange={primaryHeightInputInputHandler}
            />
            <input
              type="text"
              placeholder={`${heightMetric === "Feet" ? "Inches" : "Centimeters"}`}
              onChange={secondaryHeightInputInputHandler}
            />
          </div>
        </div>

        <div className={Class.weight}>
          <label>Weight</label>
          <section className={Class.buttons}>
            <button
              onClick={weightClickHandler}
              className={weightMetric === "Pounds" && Class.buttonActive}
              name="Pounds"
            >
              Imperial
            </button>
            <button onClick={weightClickHandler} className={weightMetric === "Kilo" && Class.buttonActive} name="Kilo">
              Metric
            </button>
          </section>
          <input
            type="text"
            placeholder={`${weightMetric === "Pounds" ? "Pounds" : "Kilograms"}`}
            onChange={weightInputHandler}
          />
        </div>

        <div className={Class.intensity}>
          <label>Intensity</label>

          <section className={Class.buttons}>
            <button onClick={intensityHandler} className={intensity === "Normal" && Class.buttonActive} name="Normal">
              Normal
            </button>
            <button
              onClick={intensityHandler}
              className={intensity === "Accelerated" && Class.buttonActive}
              name="Accelerated"
            >
              Accelerated
            </button>
            <button onClick={intensityHandler} className={intensity === "Extreme" && Class.buttonActive} name="Extreme">
              Extreme
            </button>
          </section>
          {!intensity ? (
            <sub>Choose your desired intensity level</sub>
          ) : intensity === "Normal" ? (
            <sub>Expect to lose between 1/2 - 1 pound a week</sub>
          ) : intensity === "Accelerated" ? (
            <sub>Expect to lose between 1 - 2 pounds a week</sub>
          ) : (
            <sub>
              <span>An extreme diet.</span> Expect to lose between 2-4 pounds a week
            </sub>
          )}
        </div>

        <div className={Class.activityLevel}>
          <label>Activity Level</label>
          <section className={Class.buttons}>
            <button onClick={intensityHandler} className={intensity === "Normal" && Class.buttonActive} name="Normal">
              Sedentary
            </button>
            <button
              onClick={intensityHandler}
              className={intensity === "Accelerated" && Class.buttonActive}
              name="Accelerated"
            >
              lightly active
            </button>
            <button onClick={intensityHandler} className={intensity === "Extreme" && Class.buttonActive} name="Extreme">
              Moderately active
            </button>
            <button onClick={intensityHandler} className={intensity === "Extreme" && Class.buttonActive} name="Extreme">
              Very active
            </button>
          </section>

          {!intensity ? (
            <sub>Select your activity level</sub>
          ) : intensity === "Sedentary" ? (
            <sub>Little or no exercise</sub>
          ) : intensity === "Lightly" ? (
            <sub>Light exercise/sports 1-3 days/week</sub>
          ) : intensity === "Moderately" ? (
            <sub>Moderate exercise/sports 3-5 days/week</sub>
          ) : (
            <sub>Hard exercise/sports 6-7 days a week</sub>
          )}
        </div>
        <button className={Class.submit}>Calculate</button>
      </form>
      {resultsActive && <CalculatorResults />}
    </div>
  );
}

export default Calculator;
