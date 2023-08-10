import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";
import {getOneDiary, getTenDiaries, saveNewItem, deleteItem} from "../apis/diaryApi";
import {useState, useEffect, useContext} from "react";
import Cookies from "js-cookie";
import {GlobalContext} from "../context/GlobalContext";

function HomePage() {
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBreakfastCalories, setTotalBreakfastCalories] = useState(0);
  const [totalLunchCalories, setTotalLunchCalories] = useState(0);
  const [totalDinnerCalories, setTotalDinnerCalories] = useState(0);
  const {date, setDate} = useContext(GlobalContext);
  const [recentItems, setRecentItems] = useState([]);

  const breakfastAddHandler = async (newItem) => {
    newItem._id = "temp id";
    setBreakfastItems((prevItems) => [newItem, ...prevItems]);
    setTotalBreakfastCalories(
      (prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings)
    );
    // update new items id
    newItem._id = await saveNewItem(newItem);
    setBreakfastItems((prevItems) => [newItem, ...prevItems.slice(1)]);
  };

  const lunchAddHandler = async (newItem) => {
    newItem._id = "temp id";
    setLunchItems((prevItems) => [newItem, ...prevItems]);
    setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings));
    // update new items id
    newItem._id = await saveNewItem(newItem);
    setLunchItems((prevItems) => [newItem, ...prevItems.slice(1)]);
  };

  const DinnerAddHandler = async (newItem) => {
    newItem._id = "temp id";
    setDinnerItems((prevItems) => [newItem, ...prevItems]);
    setTotalDinnerCalories(
      (prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings)
    );
    // update new items id
    newItem._id = await saveNewItem(newItem);
    setDinnerItems((prevItems) => [newItem, ...prevItems.slice(1)]);
  };

  const updateBreakfastTotals = (calories, newCal) => {
    setTotalBreakfastCalories((prevCals) => prevCals - calories + parseInt(newCal));
  };
  const updateLunchTotals = (calories, newCal) => {
    setTotalLunchCalories((prevCals) => prevCals - calories + parseInt(newCal));
  };
  const updateDinnerTotals = (calories, newCal) => {
    setTotalDinnerCalories((prevCals) => prevCals - calories + parseInt(newCal));
  };

  const deleteItemHandler = (_id, removedCal, timeOfDay) => {
    deleteItem(_id);
    if (timeOfDay === "Breakfast") {
      setBreakfastItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateBreakfastTotals(removedCal, 0);
    } else if (timeOfDay === "Lunch") {
      setLunchItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateLunchTotals(removedCal, 0);
    } else if (timeOfDay === "Dinner") {
      setDinnerItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateDinnerTotals(removedCal, 0);
    }
  };

  // Retrieves and updates items from the diary for a given day.
  // Resets displayed data for different time-of-day sections.
  const getItemsFromDiary = async () => {
    try {
      // Reset displayed data when date is changed
      setBreakfastItems([]);
      setLunchItems([]);
      setDinnerItems([]);
      setTotalBreakfastCalories(0);
      setTotalLunchCalories(0);
      setTotalDinnerCalories(0);

      // Fetch items from the diary for the given day
      const items = await getOneDiary();

      if (items) {
        setIsLoading(false);

        // Update state for each item based on its time of day
        items.forEach((item) => {
          if (item.timeOfDay === "Breakfast") {
            setBreakfastItems((prevItems) => [item, ...prevItems]);
          } else if (item.timeOfDay === "Lunch") {
            setLunchItems((prevItems) => [item, ...prevItems]);
          } else if (item.timeOfDay === "Dinner") {
            setDinnerItems((prevItems) => [item, ...prevItems]);
          }

          // Calculate calorie totals for each item
          getCalorieTotals(item);
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  //  Calculates and updates the total calorie count based on the provided item's details.
  //  Updates the calorie total based on the item's time of day.
  const getCalorieTotals = (item) => {
    try {
      if (item.timeOfDay === "Breakfast") {
        setTotalBreakfastCalories(
          (prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings)
        );
      } else if (item.timeOfDay === "Lunch") {
        setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings));
      } else if (item.timeOfDay === "Dinner") {
        setTotalDinnerCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getItemsFromDiaries = async () => {
    const diaries = await getTenDiaries();
    let items = [];
    diaries.map((diary) => {
      if (items.length <= 20) {
        items.push(...diary.items);
      }
    });
    setRecentItems([...new Set(items.reverse())]);
  };

  useEffect(() => {
    try {
      // Retrieve and update items from the diary for the given day
      getItemsFromDiary();

      // Fetch items from diaries and extract items into an array
      getItemsFromDiaries();

      // Clean-up function (no specific actions needed)
      return;
    } catch (error) {
      // Handle errors appropriately
      console.error("An error occurred:", error);
    }
  }, [date]);

  // increments date by -1 day and updates displayed data
  const leftArrowClickHandler = () => {
    const year = new Date().getFullYear();
    const dayDate = Cookies.get("dayDate");
    const date = new Date(year, 0, parseInt(dayDate) - 1).toLocaleDateString();
    setDate(date);
    Cookies.set("dayDate", parseInt(dayDate) - 1, {expires: 1});
    setIsLoading(true);
  };

  // increments date by +1 day and updates displayed data
  const rightArrowClickHandler = () => {
    const year = new Date().getFullYear();
    const dayDate = Cookies.get("dayDate");
    const date = new Date(year, 0, parseInt(dayDate) + 1).toLocaleDateString();
    setDate(date);
    Cookies.set("dayDate", parseInt(dayDate) + 1, {expires: 1});
    setIsLoading(true);
  };

  return (
    <>
      <DiarySummary
        calories={totalBreakfastCalories + totalLunchCalories + totalDinnerCalories}
        rightArrowClick={rightArrowClickHandler}
        leftArrowClick={leftArrowClickHandler}
      />
      <Diary
        timeOfDay={"Breakfast"}
        items={breakfastItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        updateTotalCals={updateBreakfastTotals}
        totalCalories={totalBreakfastCalories}
        deleteItem={deleteItemHandler}
        recentItems={recentItems}
      />
      <Diary
        timeOfDay={"Lunch"}
        items={lunchItems}
        isLoading={isLoading}
        addItem={lunchAddHandler}
        updateTotalCals={updateLunchTotals}
        totalCalories={totalLunchCalories}
        deleteItem={deleteItemHandler}
      />
      <Diary
        timeOfDay={"Dinner"}
        items={dinnerItems}
        isLoading={isLoading}
        addItem={DinnerAddHandler}
        updateTotalCals={updateDinnerTotals}
        totalCalories={totalDinnerCalories}
        deleteItem={deleteItemHandler}
      />
    </>
  );
}

export default HomePage;
