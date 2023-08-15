import Class from "./Calculator.module.css";
import {useState} from "react";

function Calculator() {
  const [heightMetric, setHeightMetric] = useState("Feet");
  const [weightMetric, setWeightMetric] = useState("Pounds");
  const [sex, setSex] = useState("Male");

  const [ageInput, setAgeInput] = useState(0);
  const [primaryHeightInput, setPrimaryHeightInput] = useState(0);
  const [secondaryHeightInput, setSecondaryHeightInput] = useState(0);
  const [weightInput, setWeightInput] = useState(0);

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

  const feetClickHandler = (e) => {
    e.preventDefault();
    setHeightMetric("Feet");
  };
  const metersClickHandler = (e) => {
    e.preventDefault();
    setHeightMetric("Meters");
  };
  const poundsClickHandler = (e) => {
    e.preventDefault();
    setWeightMetric("Pounds");
  };
  const kiloClickHandler = (e) => {
    e.preventDefault();
    setWeightMetric("Kilo");
  };
  const maleSexHandler = (e) => {
    e.preventDefault();
    setSex("Male");
  };
  const femaleSexHandler = (e) => {
    e.preventDefault();
    setSex("Female");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ageInput, primaryHeightInput, secondaryHeightInput, weightInput);
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
            <button onClick={maleSexHandler} className={sex === "Male" && Class.buttonActive}>
              Male
            </button>
            <button onClick={femaleSexHandler} className={sex === "Female" && Class.buttonActive}>
              Female
            </button>
          </section>
        </div>

        <div className={Class.height}>
          <label>Height</label>

          <section className={Class.buttons}>
            <button onClick={feetClickHandler} className={heightMetric === "Feet" && Class.buttonActive}>
              Imperial
            </button>
            <button onClick={metersClickHandler} className={heightMetric === "Meters" && Class.buttonActive}>
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
            <button onClick={poundsClickHandler} className={weightMetric === "Pounds" && Class.buttonActive}>
              Imperial
            </button>
            <button onClick={kiloClickHandler} className={weightMetric === "Kilo" && Class.buttonActive}>
              Metric
            </button>
          </section>
          <input
            type="text"
            placeholder={`${weightMetric === "Pounds" ? "Pounds" : "Kilograms"}`}
            onChange={weightInputHandler}
          />
        </div>
        <button className={Class.submit}>Calculate</button>
      </form>
    </div>
  );
}

export default Calculator;
