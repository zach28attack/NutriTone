import Cookies from "js-cookie";

export async function getOneDiary() {
  try {
    const res = await fetch("http://localhost:3000/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({date: "1/1/2023"}),
    });
    if (res) {
      const data = await res.json();
      return data.items;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTenDiaries() {
  const res = fetch("http://localhost:3000/diaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({date: "1/1/2023"}),
  });

  if (res) {
    const data = await res.json();
    return data.diaries;
  }
}
