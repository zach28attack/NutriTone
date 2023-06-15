import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";

function HomePage() {
  const diaries = [{name: "Egg", servings: 1, calories: 205}];
  const diaries2 = [
    {name: "Steak and eggs", servings: 99, calories: 550},
    {name: "Steak and eggs", servings: 99, calories: 550},
    {name: "Steak and eggs", servings: 99, calories: 550},
  ];
  const diaries3 = [{name: "", servings: undefined, calories: undefined}];
  return (
    <>
      <DiarySummary />
      <Diary timeOfDay={"Breakfast"} diaries={diaries} />
      <Diary timeOfDay={"Lunch"} diaries={diaries2} />
      <Diary timeOfDay={"Dinner"} diaries={diaries3} />
    </>
  );
}

export default HomePage;
