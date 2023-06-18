import Cookies from "js-cookie";

export async function signup(email, username, password, passwordConfirmation) {
  try {
    const result = await fetch("http://localhost:3000/user", {
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

    if (result.ok) {
      const data = await result.json();
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
