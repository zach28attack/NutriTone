import Class from "./Post.module.css";
import {BsHeart} from "react-icons/bs";
import {useState} from "react";
import PostOptionsBtn from "./PostOptionsBtn";
import Cookies from "js-cookie";
import {updatePost} from "../../apis/communityApi";
import HeartIcon from "./HeartIcon";

function Post({post, groupName, id, communityId, deleteCommunityPosts, updatePosts}) {
  const [isEditing, setIsEditing] = useState();
  const [input, setInput] = useState();
  const cancelEditHandler = () => {
    setIsEditing(false);
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const editSubmitHandler = (e) => {
    e.preventDefault();
    updatePost(communityId, id, input);
    updatePosts(communityId, id, input);
    setIsEditing(false);
  };

  return (
    <div className={Class.post}>
      <header className={Class.header}>
        <span>{groupName}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </header>
      <div className={Class.userGroup}>
        <img src="../../public/default-profile-picture1.jpg" className={Class.img} />
        <div className={Class.userNameGroup}>
          {post.name !== "undefined" ? (
            <>
              <span>{post.name}</span>
              <sub>@{post.username}</sub>
            </>
          ) : (
            <span>@{post.username}</span>
          )}
        </div>
        <div className={Class.iconGroup}>
          <HeartIcon />
          {post.userId === Cookies.get("userId") && (
            <PostOptionsBtn
              id={id}
              communityId={communityId}
              deleteCommunityPosts={deleteCommunityPosts}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      </div>

      <article className={Class.postContent}>
        {!isEditing ? (
          post.body
        ) : (
          <form className={Class.editForm} onSubmit={editSubmitHandler}>
            <textarea type="text" onChange={inputHandler} />
            <button onClick={cancelEditHandler} className={Class.cancelBtn}>
              Cancel
            </button>
            <input type="submit" />
          </form>
        )}
      </article>
    </div>
  );
}

export default Post;
