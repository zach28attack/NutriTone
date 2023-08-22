import Class from "./Post.module.css";
import {useState, useContext, useEffect} from "react";
import PostOptionsBtn from "./PostOptionsBtn";
import Cookies from "js-cookie";
import {updatePost} from "../../apis/communityApi";
import HeartIcon from "./HeartIcon";
import {GlobalContext} from "../../context/GlobalContext";
import {getCompressedProfilePic} from "../../apis/userApi";

function Post({post, groupName, id, communityId}) {
  const [isEditing, setIsEditing] = useState();
  const [input, setInput] = useState();
  const {updatePosts, likedPostIds, setLikedPostIds} = useContext(GlobalContext);
  const [imageData, setImageData] = useState();

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

  const getAndSetImageData = async () => {
    try {
      const data = await getCompressedProfilePic(post.userId);
      if (data) {
        setImageData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAndSetImageData();
  }, []);

  return (
    <div className={Class.post}>
      <header className={Class.header}>
        <span>{groupName}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </header>
      <div className={Class.userGroup}>
        <img src={imageData ? imageData : "blank.png"} className={Class.img} />
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
          <HeartIcon
            communityId={communityId}
            postId={id}
            likedPostIds={likedPostIds}
            setLikedPostIds={setLikedPostIds}
            likesData={post.likes || 0}
          />
          {post.userId === Cookies.get("userId") && (
            <PostOptionsBtn id={id} communityId={communityId} setIsEditing={setIsEditing} />
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
