import Cookies from "js-cookie";

exports.signup = async (email, username, password, passwordConfirmation) => {
  const result = await fetch("localhost:3000/user/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
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
};
