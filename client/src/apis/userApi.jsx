import Cookies from "js-cookie";

export async function signup(email, username, password, passwordConfirmation) {
  try {
    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const dayDate = Math.ceil((today - startOfYear) / (1000 * 60 * 60 * 24));
      Cookies.set("dayDate", dayDate, {expires: 1});
      Cookies.set("userId", data.id, {expires: 1});
      Cookies.set("token", data.token, {expires: 1});
      Cookies.set("username", username, {expires: 1});

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      Cookies.remove("userId");
      Cookies.remove("token");
      Cookies.remove("dayDate");
      Cookies.remove("name");
      Cookies.remove("username");
      return true;
    } else {
      console.error("Issue done happened");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function login(username, password) {
  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password}),
    });
    if (response.ok) {
      const data = await response.json();
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const dayDate = Math.ceil((today - startOfYear) / (1000 * 60 * 60 * 24));
      Cookies.set("dayDate", dayDate, {expires: 1});
      Cookies.set("token", data.token, {expires: 1});
      Cookies.set("userId", data.id, {expires: 1});
      Cookies.set("name", data.name, {expires: 1});
      Cookies.set("username", data.username, {expires: 1});
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getLikedPostIds() {
  console.log("runnunn");
  try {
    const res = await fetch("http://localhost:3000/user/likedPostIds", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.likedPostIds || [];
    } else {
      console.error("server error");
    }
  } catch (error) {
    console.error("getLikedPostIds() error:", error);
  }
}
