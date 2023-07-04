import Cookies from "js-cookie";

export async function getWeightLogs() {
  const res = await fetch("http://localhost:3000/logs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.logs;
  }
}
