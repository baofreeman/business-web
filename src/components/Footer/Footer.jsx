import { Button } from "../ui/index";
import FbIcon from "../../assets/icons/FbIcon";
import InsIcon from "../../assets/icons/InsIcon";
import Marquee from "../../features/Marquee";

const Footer = ({ id }) => {
  return (
    <div id={id} className="footer-layout z-10 dark:bg-black bg-white">
      <div
        className="flex items-center px-[20px] sm:px-[10px]"
        style={{ height: "100%" }}
      >
        <div className="flex items-center sm:justify-center border-r rounded-r">
          <h1 className="text-md sm:text-sm">c[2024]</h1>
          <Button size="s" design="link-primary" to={"/"}>
            <FbIcon />
          </Button>
          <Button size="s" design="link-primary" to={"/"}>
            <InsIcon />
          </Button>
        </div>
        <div className="flex w-full items-center overflow-scroll no-scrollbar">
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                clothes Official Web Site
              </span>
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                Contact Us
              </span>
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                Order Status
              </span>
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                Website Terms and Conditions
              </span>
            </Button>
          </div>
        </div>
        <Marquee />
      </div>
    </div>
  );
};

export default Footer;
