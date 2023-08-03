import Class from "./PostForm.module.css";
import {useState} from "react";
import {saveNewPost} from "../../apis/communityApi";
import Cookies from "js-cookie";

function CommunityForm({communityId, setPosts, updateCommunityPosts}) {
  const [activeClass, setActiveClass] = useState();
  const [input, setInput] = useState();

  const submitClickHandler = async (e) => {
    const post = {
      body: input,
      date: new Date(),
      name: Cookies.get("name"),
      username: Cookies.get("username"),
      userId: Cookies.get("userId"),
      _id: `temp key ${new Date()}`,
    };
    e.preventDefault();
    setInput("");
    setActiveClass(!activeClass);

    // immediately update page with new post
    setPosts((prevPosts) => [post, ...prevPosts]);
    try {
      post._id = await saveNewPost(post, communityId);
      // after new post is saved an id is returned and then the posts are updated
      setPosts((prevPosts) => {
        const filteredPosts = prevPosts.slice(1);
        return [post, ...filteredPosts];
      });
      updateCommunityPosts(post, communityId);
    } catch (error) {
      console.error(error);
    }
  };
  const inputHandler = (input) => {
    setInput(input.target.value);
  };

  return (
    <form className={Class.form}>
      <article className={Class.postContent}>
        <textarea type="text" className={Class.input} onChange={inputHandler} value={input} />
        <input type="submit" value="Post" className={Class.submit} onClick={submitClickHandler} />
      </article>
    </form>
  );
}

export default CommunityForm;
