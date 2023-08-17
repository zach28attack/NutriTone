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
  const [intensity, setIntensity] = useState("");
  const [results, setResults] = useState(0);
  const [resultsActive, setResultsActive] = useState(false);
  const [activityLevel, setActivityLevel] = useState("");

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
  const activityHandler = (e) => {
    e.preventDefault();
    setActivityLevel(e.target.name);
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
    let heightInCM = 0;
    let weightInKG = 0;
    const activityMultiplier =
      activityLevel === "Sedentary"
        ? 1.2
        : activityLevel === "Lightly"
        ? 1.375
        : activityLevel === "Moderately"
        ? 1.55
        : 1.725;

    // This calculates the calorie defecit. 10-20% deficit is recommended.
    const intensityMultiplier = intensity === "Normal" ? 0.9 : intensity === "Accelerated" ? 0.8 : 0.7;

    if (weightMetric === "Pounds") weightInKG = weightInput * 0.45359237; // converts pounds to kg
    if (heightMetric === "Feet") {
      heightInCM = (parseInt(primaryHeightInput) * 12 + parseInt(secondaryHeightInput)) * 2.54; // converts feet to inches then to cm
    } else {
      heightInCM = parseInt(primaryHeightInput) * 100 + parseInt(secondaryHeightInput); // converts meters to a sum of cm
    }

    if (sex === "Male") {
      // BMR = (13.397 × weight in kg) + (4.799 × height in cm) – (5.677 × age in years) + 88.362
      const calorieBudget =
        (13.397 * weightInKG + 4.799 * heightInCM - 5.677 * ageInput + 88.362) *
        activityMultiplier *
        intensityMultiplier;
      setResults(calorieBudget.toString().split(".")[0]);
    } else {
      // BMR = (9.247 × weight in kg) + (3.098 × height in cm) – (4.330 × age in years) + 447.593
      const calorieBudget =
        (9.247 * weightInKG + 3.098 * heightInCM - 4.33 * ageInput + 447.593) *
        activityMultiplier *
        intensityMultiplier;
      setResults(calorieBudget.toString().split(".")[0]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    HBFormula();
    setResultsActive(true);
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
            <button onClick={sexHandler} className={sex === "Male" ? Class.buttonActive : ""} name="Male">
              Male
            </button>
            <button onClick={sexHandler} className={sex === "Female" ? Class.buttonActive : ""} name="Female">
              Female
            </button>
          </section>
        </div>

        <div className={Class.height}>
          <label>Height</label>
          <section className={Class.buttons}>
            <button
              onClick={heightClickHandler}
              className={heightMetric === "Feet" ? Class.buttonActive : ""}
              name="Feet"
            >
              Imperial
            </button>
            <button
              onClick={heightClickHandler}
              className={heightMetric === "Meters" ? Class.buttonActive : ""}
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
              className={weightMetric === "Pounds" ? Class.buttonActive : ""}
              name="Pounds"
            >
              Imperial
            </button>
            <button
              onClick={weightClickHandler}
              className={weightMetric === "Kilo" ? Class.buttonActive : ""}
              name="Kilo"
            >
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
            <button
              onClick={intensityHandler}
              className={intensity === "Normal" ? Class.buttonActive : ""}
              name="Normal"
            >
              Normal
            </button>
            <button
              onClick={intensityHandler}
              className={intensity === "Accelerated" ? Class.buttonActive : ""}
              name="Accelerated"
            >
              Accelerated
            </button>
            <button
              onClick={intensityHandler}
              className={intensity === "Extreme" ? Class.buttonActive : ""}
              name="Extreme"
            >
              Extreme
            </button>
          </section>
          {!intensity ? (
            <sub>Choose your desired intensity level</sub>
          ) : intensity === "Normal" ? (
            <sub>Expect to lose around 1 pound a week</sub>
          ) : intensity === "Accelerated" ? (
            <sub>Expect to lose around 2 pounds a week</sub>
          ) : (
            <sub>
              <span>An extreme diet.</span> Expect to lose around 3 pounds a week
            </sub>
          )}
        </div>

        <div className={Class.activityLevel}>
          <label>Activity Level</label>
          <section className={Class.buttons}>
            <button
              onClick={activityHandler}
              className={activityLevel === "Sedentary" ? Class.buttonActive : ""}
              name="Sedentary"
            >
              Sedentary
            </button>
            <button
              onClick={activityHandler}
              className={activityLevel === "Lightly" ? Class.buttonActive : ""}
              name="Lightly"
            >
              Lightly
            </button>
            <button
              onClick={activityHandler}
              className={activityLevel === "Moderately" ? Class.buttonActive : ""}
              name="Moderately"
            >
              Moderately
            </button>
            <button
              onClick={activityHandler}
              className={activityLevel === "Very" ? Class.buttonActive : ""}
              name="Very"
            >
              Very
            </button>
          </section>

          {!activityLevel ? (
            <sub>Select your activity level</sub>
          ) : activityLevel === "Sedentary" ? (
            <sub>Little or no exercise</sub>
          ) : activityLevel === "Lightly" ? (
            <sub>Light exercise 1-3 days/week</sub>
          ) : activityLevel === "Moderately" ? (
            <sub>Moderate exercise 3-5 days/week</sub>
          ) : (
            <sub>Hard exercise 6-7 days a week</sub>
          )}
        </div>
        <button className={Class.submit}>Calculate</button>
      </form>
      {resultsActive && <CalculatorResults results={results} />}
    </div>
  );
}

export default Calculator;
