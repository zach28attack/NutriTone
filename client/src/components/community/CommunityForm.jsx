import Class from "./CommunityForm.module.css";
import {useState} from "react";
import {saveNewPost} from "../../apis/communityApi";
import Cookies from "js-cookie";

function CommunityForm({communityId, setPosts, updateCommunityPosts}) {
  const [activeClass, setActiveClass] = useState();
  const [input, setInput] = useState();
  const submitClickHandler = (e) => {
    const post = {
      body: input,
      date: new Date(),
      name: Cookies.get("name"),
      username: Cookies.get("username"),
    };
    e.preventDefault();
    setActiveClass(!activeClass);
    saveNewPost(post, communityId);
    setPosts((prevPosts) => [post, ...prevPosts]);
    updateCommunityPosts(post, communityId);
  };
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
