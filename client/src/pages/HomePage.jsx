import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";
import {getOneDiary, getTenDiaries} from "../apis/diaryApi";
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
          ? setBreakfastItems((prevItems) => [...prevItems, item])
          : item.timeOfDay === "Lunch"
          ? setLunchItems((prevItems) => [...prevItems, item])
          : item.timeOfDay === "Dinner"
          ? setDinnerItems((prevItems) => [...prevItems, item])
          : undefined;

        getCalorieTotals(item);
      });
    }
  };
  const getCalorieTotals = (item) => {
    item.timeOfDay === "Breakfast"
      ? setTotalBreakfastCalories((prevItems) => prevItems + item.calories)
      : item.timeOfDay === "Lunch"
      ? setTotalLunchCalories((prevItems) => prevItems + item.calories)
      : item.timeOfDay === "Dinner"
      ? setTotalDinnerCalories((prevItems) => prevItems + item.calories)
      : undefined;
  };
  const [totalBreakfastCalories, setTotalBreakfastCalories] = useState(0);
  const [totalLunchCalories, setTotalLunchCalories] = useState(0);
  const [totalDinnerCalories, setTotalDinnerCalories] = useState(0);

  useEffect(() => {
    getItemsFromDiary();
    // getTenDiaries();
  }, []);

  const breakfastAddHandler = (newItem) => {
    setBreakfastItems((prevItems) => [newItem, ...prevItems]);
    setTotalBreakfastCalories((prevItems) => prevItems + parseInt(newItem.calories));
  };

  return (
    <>
      <DiarySummary />
      <Diary
        timeOfDay={"Breakfast"}
        items={breakfastItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        totalCalories={totalBreakfastCalories}
      />
      <Diary
        timeOfDay={"Lunch"}
        items={lunchItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        totalCalories={totalLunchCalories}
      />
      <Diary
        timeOfDay={"Dinner"}
        items={dinnerItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        totalCalories={totalDinnerCalories}
      />
    </>
  );
}

export default HomePage;
