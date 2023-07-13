import Class from "./CommunityGroupPage.module.css";
import Post from "../components/community/Post";

function CommunityGroupPage() {
  const user = {
    name: "testing",
    username: "@user990099",
    body: "TESTING testing heeerrrrrrr",
    img: "../../public/default-profile-picture1.jpg",
  };
  return (
    <div className={Class.container}>
      <h1>[Group Name]</h1>
      <Post user={user} />
    </div>
  );
}

export default CommunityGroupPage;
