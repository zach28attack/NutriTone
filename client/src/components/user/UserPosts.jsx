import {useContext} from "react";
import Class from "./UserPosts.module.css";
import Post from "../community/Post";
import {GlobalContext} from "../../context/GlobalContext";
import Cookies from "js-cookie";
function UserPosts() {
  const {posts} = useContext(GlobalContext);
  const userId = Cookies.get("userId");

  return (
    <div className={Class.container}>
      <div className={Class.feed}>
        <h1>My posts</h1>
        {posts.map((post) => {
          if (post.userId === userId)
            return (
              <Post
                post={post}
                groupName={post.communityName}
                key={post._id}
                id={post._id}
                communityId={post.communityId}
              />
            );
        })}
      </div>
    </div>
  );
}

export default UserPosts;
