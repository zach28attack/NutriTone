export async function apiTest(searchItem) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/foods/search?query=${encodeURIComponent(searchItem)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.foods;
    }
  } catch (error) {
    console.error(error);
  }
}
