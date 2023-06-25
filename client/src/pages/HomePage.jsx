import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";
import {getOneDiary, getTenDiaries, saveNewItem} from "../apis/diaryApi";
import {useState, useEffect} from "react";

function HomePage() {
  // const diaries = [{name: "Egg", servings: 1, calories: 205}];
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItemsFromDiary = async () => {
    const items = await getOneDiary(); // will return all items from a given day

    if (items) {
      setIsLoading(false);
      items.forEach((item) => {
        item.timeOfDay === "Breakfast"
          ? setBreakfastItems((prevItems) => [item, ...prevItems])
          : item.timeOfDay === "Lunch"
          ? setLunchItems((prevItems) => [item, ...prevItems])
          : item.timeOfDay === "Dinner"
          ? setDinnerItems((prevItems) => [item, ...prevItems])
          : undefined;

        getCalorieTotals(item);
      });
    }
  };
  const getCalorieTotals = (item) => {
    item.timeOfDay === "Breakfast"
      ? setTotalBreakfastCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories))
      : item.timeOfDay === "Lunch"
      ? setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories))
      : item.timeOfDay === "Dinner"
      ? setTotalDinnerCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories))
      : undefined;
  };
  const [totalBreakfastCalories, setTotalBreakfastCalories] = useState(0);
  const [totalLunchCalories, setTotalLunchCalories] = useState(0);
  const [totalDinnerCalories, setTotalDinnerCalories] = useState(0);

  useEffect(() => {
    getItemsFromDiary();
    // getTenDiaries();
  }, []);

  const breakfastAddHandler = async (newItem) => {
    newItem._id = 0;
    setBreakfastItems((prevItems) => [newItem, ...prevItems]);
    setTotalBreakfastCalories((prevItems) => parseInt(prevItems) + parseInt(newItem.calories));

    newItem._id = await saveNewItem(newItem);
    setBreakfastItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateBreakfastTotals = (prevCal, newCal) => {
    setTotalBreakfastCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return (total += parseInt(newCal));
    });
  };

  const lunchAddHandler = async (newItem) => {
    newItem._id = 0;
    setLunchItems((prevItems) => [newItem, ...prevItems]);
    setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(newItem.calories));

    newItem._id = await saveNewItem(newItem);
    setLunchItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateLunchTotals = (prevCal, newCal) => {
    setTotalLunchCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return (total += parseInt(newCal));
    });
  };

  const DinnerAddHandler = async (newItem) => {
    newItem._id = 0;
    setDinnerItems((prevItems) => [newItem, ...prevItems]);
    setTotalDinnerCalories((prevItems) => parseInt(prevItems) + parseInt(newItem.calories));

    newItem._id = await saveNewItem(newItem);
    setDinnerItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateDinnerTotals = (prevCal, newCal) => {
    setTotalDinnerCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return (total += parseInt(newCal));
    });
  };

  return (
    <>
      <DiarySummary />
      <Diary
        timeOfDay={"Breakfast"}
        items={breakfastItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        updateTotalCals={updateBreakfastTotals}
        totalCalories={totalBreakfastCalories}
      />
      <Diary
        timeOfDay={"Lunch"}
        items={lunchItems}
        isLoading={isLoading}
        addItem={lunchAddHandler}
        updateTotalCals={updateLunchTotals}
        totalCalories={totalLunchCalories}
      />
      <Diary
        timeOfDay={"Dinner"}
        items={dinnerItems}
        isLoading={isLoading}
        addItem={DinnerAddHandler}
        updateTotalCals={updateDinnerTotals}
        totalCalories={totalDinnerCalories}
      />
    </>
  );
}

export default HomePage;
