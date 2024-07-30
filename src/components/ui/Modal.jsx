import { Button } from "../../components/ui/index";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const Modal = ({ handleToggleModal, callback, data, title }) => {
  return (
    <div className="w-full h-[100%] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
      <div
        className="w-full h-[100%] bg-black opacity-80"
        onClick={handleToggleModal}
      ></div>
      <div className="bg-white flex items-center justify-center w-[300px] h-[150px] dark:bg-black border rounded-md absolute">
        <div className="absolute top-3 right-3">
          <DeleteIcon handleToggleModal={handleToggleModal} />
        </div>
        <div className="flex justify-center gap-4 flex-col">
          <h1>{title}</h1>
          <div className="flex justify-center gap-2">
            <Button size="s" design="primary" onClick={() => callback(data)}>
              Xoá
            </Button>
            <Button size="s" design="basic" onClick={handleToggleModal}>
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
