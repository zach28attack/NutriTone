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

export async function saveNewPost(post) {
  try {
    const res = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        post: post,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("data:", data);
    }
  } catch (error) {
    console.error(error);
  }
}
