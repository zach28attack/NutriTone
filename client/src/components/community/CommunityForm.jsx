import Class from "./CommunityForm.module.css";
import {useState} from "react";
import {saveNewPost} from "../../apis/communityApi";

function CommunityForm() {
  const submitClickHandler = (e) => {
    e.preventDefault();
    setActiveClass(!activeClass);
    saveNewPost({userId: Cookies.get("userId"), body: input, date: new Date()});
  };
  const [activeClass, setActiveClass] = useState();
  const [input, setInput] = useState();
  const inputHandler = (input) => {
    setInput(input.target.value);
  };
  return (
    <form className={Class.form}>
      <article className={Class.postContent}>
        <textarea type="text" className={Class.input} onChange={inputHandler} />
        <input type="submit" value="Post" className={Class.submit} onClick={submitClickHandler} />
      </article>
    </form>
  );
}

export default CommunityForm;
