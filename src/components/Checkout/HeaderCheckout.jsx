import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const HeaderCheckout = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center">
      <span className="text-base sm:text-md uppercase flex gap-2">
        / <h1 className="text-active">Thanh toán</h1> /
      </span>
      <div className="flex items-center gap-2">
        <div className="bg-white dark:bg-black">
          <ArrowIcon width={12} height={7} rotate={"-90deg"} />
        </div>
        <Button size="s-link" design="link-primary" to={"/cart"}>
          Giỏ hàng
        </Button>
      </div>
    </div>
  );
};

export default HeaderCheckout;
