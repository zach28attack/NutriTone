import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";

function CommunityPage() {
  return (
    <div className={Class.page}>
      <div className={Class.feed}>
        <h1>Feed</h1>
        <Post />
      </div>
      <div className={Class.menu}>
        <Menu />
      </div>
    </div>
  );
}

export default CommunityPage;
