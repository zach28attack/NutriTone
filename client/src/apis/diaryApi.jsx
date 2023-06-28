import Cookies from "js-cookie";

export async function getOneDiary() {
  try {
    const res = await fetch("http://localhost:3000/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({date: `${Cookies.get("dayDate")}/${new Date().getFullYear()}`}),
    });
    if (res.ok) {
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
      body: JSON.stringify({date: `${Cookies.get("dayDate")}/${new Date().getFullYear()}`}),
    });

    if (res.ok) {
      const data = await res.json();
      return data.diaries;
    }
  } catch (error) {
    console.error(error);
  }
}

// request requires item.name, item.calories, item.servings, item.timeOfDay, date
export async function saveNewItem(item) {
  try {
    const res = await fetch("http://localhost:3000/diary/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({item: item, date: `${Cookies.get("dayDate")}/${new Date().getFullYear()}`}),
    });
    if (res.ok) {
      const data = await res.json();
      return data._id;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateItem(item) {
  try {
    const res = await fetch("http://localhost:3000/diary/item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({item: item, date: `${Cookies.get("dayDate")}/${new Date().getFullYear()}`}),
    });

    //TODO: give user feedback through small notification banner at top of screen for api requests responsees such as this
  } catch (error) {
    console.error(error);
  }
}
export async function deleteItem(_id) {
  try {
    const res = await fetch("http://localhost:3000/diary/item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({_id: _id, date: `${Cookies.get("dayDate")}/${new Date().getFullYear()}`}),
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
