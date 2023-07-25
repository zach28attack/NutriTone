import Class from "./HeartIcon.module.css";
import {useState} from "react";
import {likePost, unlikePost} from "../../apis/communityApi";
import Cookies from "js-cookie";
import {useEffect} from "react";

function HeartIcon({communityId, postId}) {
  const [likedPost, setLikedPost] = useState(false);

  const heartClickHandler = () => {
    setLikedPost(!likedPost);
    likePost(communityId, postId);
  };
  const setActiveIfLiked = () => {};
  useEffect(() => {
    setActiveIfLiked();
  }, []);

  return (
    <div className={Class.container} onClick={heartClickHandler}>
      <div className={Class.heartLeftContainer}>
        <div className={`${Class.heartTopLeft} ${likedPost && Class.active}`}></div>
      </div>
      <div className={Class.heartRightContainer}>
        <div className={`${Class.heartTopRight} ${likedPost && Class.active}`}></div>
      </div>
      <div className={Class.squareContainer}>
        <div className={`${Class.square} ${likedPost && Class.active}`}></div>
      </div>
      <div className={Class.heartBottom}></div>

      {likedPost && (
        <div className={Class.sparksContainer}>
          <div className={Class.spark1Container}>
            <div className={`${Class.sparks1} ${likedPost && Class.activeSpark1}`}></div>
          </div>
          <div className={Class.spark2Container}>
            <div className={`${Class.sparks2} ${likedPost && Class.activeSpark2}`}></div>
          </div>
          <div className={Class.spark3Container}>
            <div className={`${Class.sparks3} ${likedPost && Class.activeSpark3}`}></div>
          </div>
          <div className={Class.spark4Container}>
            <div className={`${Class.sparks4} ${likedPost && Class.activeSpark4}`}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeartIcon;
