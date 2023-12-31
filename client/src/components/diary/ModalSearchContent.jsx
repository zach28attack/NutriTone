import Class from "./ModalSearchContent.module.css";
import {useState} from "react";
import {apiTest} from "../../apis/usdaApi";
import ModalSearchItem from "./ModalSearchItem";

function ModalSearchContent(props) {
  const [searchInput, setSearchInput] = useState();
  const inputHandler = (input) => {
    setSearchInput(input.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const items = await apiTest(searchInput);
    setSearchResults(items);
  };
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className={Class.page}>
      <div className={Class.container}>
        <form className={Class.searchbar}>
          <input type="text" className={Class.input} onChange={inputHandler} placeholder="search..." />
          <input type="submit" className={Class.submit} onClick={submitHandler} />
        </form>
        <div className={Class.content}>
          {searchResults.map((item) => {
            return (
              <ModalSearchItem
                item={item}
                key={item.fdcId}
                addItem={props.addItem}
                timeOfDay={props.timeOfDay}
                setIsActive={props.setIsActive}
                isRecentContent={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModalSearchContent;
