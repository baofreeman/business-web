import React from "react";
import Button from "../Button/Button";
import FbIcon from "../../../assets/icons/FbIcon";
import InsIcon from "../../../assets/icons/InsIcon";

const Footer = () => {
  return (
    <div className="footer-layout z-10 dark:bg-black bg-white">
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
              clothes Official Web Site
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              Contact Us
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              Order Status
            </Button>
          </div>
          <div className="border-r rounded-r px-3 sm:p-2 sm:whitespace-nowrap">
            <Button size="s-link" design="link-basic" to={"/"}>
              Website Terms and Conditions
            </Button>
          </div>
        </div>
        <div className="relative w-full overflow-hidden sm:hidden">
          <div className="w-full overflow-hidden flex whitespace-nowrap">
            <div className="animate-marque">
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES </span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
            </div>
            <div className="animate-marque">
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES </span>
              <span className="pr-1">BUSINESS CLOTHES BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
              <span className="pr-1">BUSINESS CLOTHES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
