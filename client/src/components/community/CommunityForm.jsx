import Class from "./CommunityForm.module.css";
import {useState} from "react";
import {saveNewPost} from "../../apis/communityApi";

function CommunityForm({communityId, setPosts}) {
  console.log(communityId);
  const submitClickHandler = (e) => {
    const post = {
      body: input,
      date: new Date(),
      name: "Johnathan Testing",
      username: "@user88888888",
    };
    e.preventDefault();
    setActiveClass(!activeClass);
    saveNewPost(post, communityId);
    setPosts((prevPosts) => [post, ...prevPosts]);
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
