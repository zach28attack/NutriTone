import Class from "./MenuForm.module.css";
import {useState} from "react";

function MenuForm() {
  const [nameInput, setNameInput] = useState();
  const [fileInput, setFileInput] = useState();
  const nameInputHandler = (input) => {
    setNameInput(input.target.value);
  };
  const fileInputHandler = (input) => {
    setFileInput(input.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(nameInput, fileInput);
  };

  return (
    <form className={Class.menuForm} onSubmit={submitHandler}>
      <div>
        <input type="text" className={Class.input} onChange={nameInputHandler} />
        <input type="submit" className={Class.submit} />
      </div>
      <input type="file" className={Class.fileInput} onChange={fileInputHandler} />
    </form>
  );
}

export default MenuForm;
