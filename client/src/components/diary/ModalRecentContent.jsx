import Class from "./ModalRecentContent.module.css";
import ModalSearchItem from "./ModalSearchItem";

function ModalRecentContent(props) {
  console.log(props.items);
  return (
    <div className={Class.page}>
      <div className={Class.container}>
        <div className={Class.content}>
          {props.items.map((item) => {
            return (
              <ModalSearchItem
                item={item}
                key={item.fdcId}
                addItem={props.addItem}
                timeOfDay={props.timeOfDay}
                setIsActive={props.setIsActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModalRecentContent;
