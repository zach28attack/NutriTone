import Class from "./Post.module.css";
import {BsHeart} from "react-icons/bs";
import {CiBookmarkCheck, CiBookmarkPlus} from "react-icons/ci";

function Post({post, groupName}) {
  return (
    <div className={Class.post}>
      <header className={Class.header}>
        <span>{groupName}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </header>
      <div className={Class.userGroup}>
        <img src="../../public/default-profile-picture1.jpg" className={Class.img} />
        <div className={Class.userNameGroup}>
          {post.name && <span>{post.name}</span>}
          <sub>@{post.username}</sub>
        </div>
        <div className={Class.iconGroup}>
          <BsHeart className={Class.icon} />
          <CiBookmarkPlus className={Class.icon} />
        </div>
      </div>
      <article className={Class.postContent}>{post.body}</article>
    </div>
  );
}

export default Post;
