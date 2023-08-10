import {useEffect, useState} from "react";
import Class from "./UserPosts.module.css";
import Post from "../community/Post";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);

  return (
    <div className={Class.Feed}>
      {posts.map((post) => (
        <Post
          post={post}
          groupName={"COMMUNITY NAME"}
          key={post._id}
          id={post._id}
          communityId={"id used for edit handler"}
          // deleteCommunityPosts={deleteCommunityPosts}
          // updatePosts={updatePosts}
          // likedPostIds={likedPostIds}
          // setLikedPostIds={setLikedPostIds}
        />
      ))}
    </div>
  );
}

export default UserPosts;
