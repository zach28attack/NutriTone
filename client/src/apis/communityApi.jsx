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

export async function editPost(post) {
  const res = await fetch("http://localhost:3000/communities", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
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
}
