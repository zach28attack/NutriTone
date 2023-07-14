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
    console.log("Api returned:", data.communities);
    return data.communities;
  }
}
