import Class from "./CommunityGroupPage.module.css";
import Post from "../components/community/Post";

function CommunityGroupPage() {
  // when communityItems are clicked in the menu call getCommunityPosts, get 10-20 posts
  // when user scrolls to bottom of page get more posts from db

  const DD = {
    name: "testing",
    username: "@user990099",
    body: "TESTING testing heeerrrrrrr",
    img: "../../public/default-profile-picture1.jpg",
    date: "1/1/2023",
  };
  return (
    <div className={Class.container}>
      <h6>*group page*</h6>
      <h1>[Group Name]</h1>
      <Post post={DD} />
    </div>
  );
}

export default CommunityGroupPage;
