export async function apiTest(searchItem) {
  try {
    const apiKey = "e2Viz8HtgD5XR78PeWbUKi58HkmmfiseLhdC8vma";
    const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${searchItem}`, {
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
