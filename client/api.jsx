import Cookies from "js-cookie";

export async function signup(email, username, password, passwordConfirmation) {
  try {
    const response = await fetch("http://localhost:3000/user", {
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
      Cookies.set("userId", data.id, {expires: 1});
      Cookies.set("token", data.token, {expires: 1});
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
      console.log("cookies removed");
    } else {
      console.error("Issue done happened");
    }
  } catch (error) {
    console.error(error);
  }
}
