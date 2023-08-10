import {useEffect, useState, useContext} from "react";
import Class from "./UserPosts.module.css";
import Post from "../community/Post";
import {GlobalContext} from "../../context/GlobalContext";

function UserPosts() {
  const {posts} = useContext(GlobalContext);
  console.log(posts);

  return (
    <div className={Class.Feed}>
      {posts.map((post) => (
        <Post post={post} groupName={post.communityName} key={post._id} id={post._id} communityId={post.communityId} />
      ))}
    </div>
  );
}

export default UserPosts;
