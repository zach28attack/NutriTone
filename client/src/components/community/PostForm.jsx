import Class from "./PostForm.module.css";
import {useState, useContext} from "react";
import {saveNewPost} from "../../apis/communityApi";
import Cookies from "js-cookie";
import {GlobalContext} from "../../context/GlobalContext";

function CommunityForm({community, setPosts}) {
  const [activeClass, setActiveClass] = useState();
  const [input, setInput] = useState();
  const {addCommunityPosts} = useContext(GlobalContext);

  const submitClickHandler = async (e) => {
    const post = {
      body: input,
      date: new Date(),
      name: Cookies.get("name"),
      username: Cookies.get("username"),
      userId: Cookies.get("userId"),
      _id: `temp key ${new Date()}`,
      communityName: community.name,
      communityId: community._id,
    };

    e.preventDefault();
    setInput("");
    // removes options menu
    setActiveClass(!activeClass);

    // immediately update page with new post
    setPosts((prevPosts) => [post, ...prevPosts]);
    try {
      post._id = await saveNewPost(post, community._id);
      // after new post is saved an id is returned and then the posts are updated
      setPosts((prevPosts) => {
        const filteredPosts = prevPosts.slice(1);
        return [post, ...filteredPosts];
      });
      addCommunityPosts(post, community._id);
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
