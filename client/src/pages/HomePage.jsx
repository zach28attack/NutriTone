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
      });
    }
  };

  useEffect(() => {
    getItemsFromDiary();
    getTenDiaries();
  }, []);

  return (
    <>
      <DiarySummary />
      <Diary timeOfDay={"Breakfast"} diaries={breakfastItems} isLoading={isLoading} />
      <Diary timeOfDay={"Lunch"} diaries={lunchItems} isLoading={isLoading} />
      <Diary timeOfDay={"Dinner"} diaries={dinnerItems} isLoading={isLoading} />
    </>
  );
}

export default HomePage;
