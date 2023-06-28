import Class from "./ModalRecentContent.module.css";
import ModalSearchItem from "./ModalSearchItem";

function ModalRecentContent(props) {
  console.log("RecentItems in RI comp", props.recentItems);
  return (
    <div className={Class.page}>
      <div className={Class.container}>
        <div className={Class.content}>
          {props.recentItems.map((item) => {
            return (
              <ModalSearchItem
                item={item}
                key={item._id}
                addItem={props.addItem}
                timeOfDay={props.timeOfDay}
                setIsActive={props.setIsActive}
                isRecentContent={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModalRecentContent;
