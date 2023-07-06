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

export async function saveNewWeightLog(log) {
  const res = await fetch("http://localhost:3000/logs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      log: log,
    }),
  });
  if (res.ok) {
    return true;
  }
}

export async function deleteWeightLog(log) {
  const res = await fetch("http://localhost:3000/logs", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      log: log,
    }),
  });
  if (res.ok) {
    return true;
  }
}
