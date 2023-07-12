import Class from "./Post.module.css";

function Post({user}) {
  return (
    <div className={Class.post}>
      <header className={Class.header}>
        <span>[Group name]</span>
        <span>[Date]</span>
      </header>
      <div className={Class.userGroup}>
        <img src={user.img} className={Class.img} />
        <div className={Class.userNameGroup}>
          <span>{user.name}</span>
          <sub>{user.username}</sub>
        </div>
      </div>
      <article className={Class.postContent}>{user.body}</article>
    </div>
  );
}

export default Post;
