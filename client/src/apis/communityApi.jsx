import Cookies from "js-cookie";

export async function getJoinedCommunities() {
  const res = await fetch("http://localhost:3000/communities", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    console.log("getJoinedCommunities() returned:", data.communities);
    return data.communities;
  }
}

export async function saveNewPost(post, communityId) {
  try {
    const res = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        post: post,
        id: communityId,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.postId;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(communityId, postId) {
  try {
    const res = await fetch(`http://localhost:3000/community/${communityId}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function editPost(communityId, postId, body) {
  try {
    const res = await fetch(`http://localhost:3000/community/${communityId}/post/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedBody: body,
      }),
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
