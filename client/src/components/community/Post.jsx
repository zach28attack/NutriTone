import Class from "./Post.module.css";

function Post() {
  return (
    <div className={Class.post}>
      <header className={Class.header}>
        <span>[Group name]</span>
        <span>[Date]</span>
      </header>
      <div className={Class.userGroup}>
        <img src="../../public/default-profile-picture1.jpg" className={Class.img} />
        <div className={Class.userNameGroup}>
          <span>Zachary Casares</span>
          <sub>@user873291</sub>
        </div>
      </div>
      <article className={Class.postContent}></article>
    </div>
  );
}

export default Post;
