import Class from "./PostOptionsBtn.module.css";
import {useState} from "react";
import {deletePost} from "../../apis/communityApi";

function PostOptionsBtn({id, communityId, deleteCommunityPosts, setIsEditing, isEditing}) {
  const [activeOptions, setActiveOptions] = useState(false);

  const optionsClickHandler = () => {
    setActiveOptions(!activeOptions);
  };
  const deleteClickHandler = () => {
    deletePost(communityId, id);
    deleteCommunityPosts(communityId, id);
  };
  const editClickHandler = () => {
    setIsEditing(true);
    setActiveOptions(!activeOptions);
  };

  return (
    <>
      <div className={Class.optionsBtn} onClick={optionsClickHandler}>
        <div className={`${Class.dot} ${activeOptions && Class.active}`}></div>
        <div className={`${Class.dot} ${activeOptions && Class.active}`}></div>
        <div className={`${Class.dot} ${activeOptions && Class.active}`}></div>
      </div>
      {activeOptions && (
        <div className={Class.menu}>
          <button onClick={editClickHandler}>Edit</button>
          <button onClick={deleteClickHandler}>Delete</button>
        </div>
      )}
    </>
  );
}

export default PostOptionsBtn;
