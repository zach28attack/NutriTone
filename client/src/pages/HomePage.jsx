import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";
import {getOneDiary, getTenDiaries} from "../apis/diaryApi";
import {useState, useEffect} from "react";

function HomePage() {
  // const diaries = [{name: "Egg", servings: 1, calories: 205}];
  const [items, setItems] = useState([{name: "", servings: undefined, calories: undefined}]);
  const [items2, setItems2] = useState([{name: "", servings: undefined, calories: undefined}]);
  const [items3, setItems3] = useState([{name: "", servings: undefined, calories: undefined}]);

  const getItemsFromDiary = async () => {
    const items = await getOneDiary(); // will return all items from a given day

    // filter each item by tOD
    setItems(items);
  };

  useEffect(() => {
    getItemsFromDiary();
    getTenDiaries();
  }, []);

  return (
    <>
      <DiarySummary />
      <Diary timeOfDay={"Breakfast"} diaries={items} />
      <Diary timeOfDay={"Lunch"} diaries={items2} />
      <Diary timeOfDay={"Dinner"} diaries={items3} />
    </>
  );
}

export default HomePage;
