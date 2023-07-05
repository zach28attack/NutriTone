import Class from "./ChartForm.module.css";
import {saveNewWeightLog} from "../../apis/weightApi";
import {useState} from "react";

function ChartForm(props) {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [datePlaceHolder, setDatePlaceHolder] = useState(new Date().toLocaleDateString());
  const [weight, setWeight] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    saveNewWeightLog({date: date, weight: parseInt(weight)});
    props.addWeightLog({date: date, weight: parseInt(weight)});
    setWeight("");
    setDatePlaceHolder("");
  };
  const weightHandler = (input) => {
    setWeight(input.target.value);
  };
  const dateHandler = (input) => {
    setDatePlaceHolder(input.target.value);
    const date = new Date(input.target.value);
    setDate(new Date(date.setDate(date.getDate() + 1)).toLocaleDateString());
  };

  return (
    <form className={Class.logForm} onSubmit={submitHandler}>
      <div>
        <label>Weight</label>
        <input type="number" className={Class.weightInput} placeholder="lbs" onChange={weightHandler} value={weight} />
      </div>

      <div>
        <label>Date</label>
        <input type="date" className={Class.dateInput} onChange={dateHandler} value={datePlaceHolder} />
      </div>

      <input type="submit" className={Class.submitBtn} />
    </form>
  );
}

export default ChartForm;
