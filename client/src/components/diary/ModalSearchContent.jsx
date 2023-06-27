import Class from "./ModalSearchContent.module.css";

function ModalSearchContent() {
  return (
    <div className={Class.page}>
      <div className={Class.container}>
        <form className={Class.searchbar}>
          <input type="text" className={Class.input} />
          <input type="submit" className={Class.submit} />
        </form>
        <div className={Class.content}></div>
      </div>
    </div>
  );
}

export default ModalSearchContent;
