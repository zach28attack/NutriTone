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
      Cookies.set("email", email, {expires: 1});

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateAccount(name, username, email, password, passwordConfirm) {
  try {
    const res = await fetch("http://localhost:3000/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        prevUsername: Cookies.get("username"),
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
    });
    if (res.ok) {
      Cookies.set("name", name, {expires: 1});
      Cookies.set("username", username, {expires: 1});
      Cookies.set("email", email, {expires: 1});
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
      console.error("Server error on logout");
      return false;
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
      Cookies.set("email", data.email, {expires: 1});

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getLikedPostIds() {
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

export async function saveCommunityId(id) {
  try {
    const res = await fetch("http://localhost:3000/user/community", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        communityId: id,
      }),
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("saveCommunityId() error:", error);
  }
}

export async function removeCommunityId(id) {
  try {
    const res = await fetch("http://localhost:3000/user/community/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        communityId: id,
      }),
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("saveCommunityId() error:", error);
  }
}

export async function getBudget() {
  try {
    const res = await fetch("http://localhost:3000/user/budget", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.budget;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function updateBudget(budget) {
  try {
    const res = await fetch("http://localhost:3000/user/budget", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: budget,
      }),
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getProfilePic() {
  try {
    const res = await fetch("http://localhost:3000/user/image", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.imageData;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function uploadImage(imageData) {
  try {
    const res = await fetch("http://localhost:3000/user/image", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageData: imageData,
      }),
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
