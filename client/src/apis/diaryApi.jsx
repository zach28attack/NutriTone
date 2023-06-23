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
  try {
    const res = await fetch("http://localhost:3000/diaries", {
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
  } catch (error) {
    console.error(error);
  }
}

export async function saveNewItem(item) {
  try {
    const res = await fetch("http://localhost:3000/diary/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({item: item, date: "1/1/2023"}),
    });
    if (res) {
      const data = await res.json();
      return data._id;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateItem(item) {
  console.log("item:", item);
  const res = await fetch("http://localhost:3000/diary/item", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({
      name: item.name,
      calories: item.calories,
      _id: item._id,
      servings: item.servings,
      date: item.date,
      timeOfDay: item.timeOfDay,
    }),
  });
  console.log(res);
}
export async function deleteItem() {
  return;
}
