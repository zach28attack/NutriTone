import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";

function CommunityPage() {
  return (
    <div className={Class.page}>
      <div className={Class.feed}>
        <Post />
      </div>
      <div></div>
    </div>
  );
}

export default CommunityPage;
