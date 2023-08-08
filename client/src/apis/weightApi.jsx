import Cookies from "js-cookie";

export async function getWeightLogs() {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function saveNewWeightLog(log) {
  try {
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
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteWeightLog(log) {
  try {
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
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
