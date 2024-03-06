export const ButtonDesign = {
  primary:
    "uppercase bg-orange text-white dark:text-black hover:bg-black dark:hover:bg-white dark:hover:text-black dark:hover:text-black font-bold rounded shadow-md shadow-gray-300 active:bg-white focus-text-black select-none",
  basic:
    "uppercase bg-white hover:bg-note text-black dark:bg-black dark:text-white hover:text-black font-bold rounded shadow-md shadow-gray-400 focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black select-none",
  delete:
    "uppercase bg-red hover:bg-red-300 text-white font-bold rounded select-none",
  disable: "uppercase border disabled:opacity-30 disabled:cursor-not-allowed",
  "trans-primary":
    "uppercase bg-transparent text-orange hover:text-text font-bold rounded border select-none",
  "trans-basic":
    "uppercase bg-transparent text-note hover:text-white font-bold rounded border select-none",
  "link-primary":
    "uppercase bg-transparent text-orange hover:text-black dark:hover:text-white font-bold select-none",
  "link-basic":
    "uppercase bg-transparent text-silver hover:text-black dark:hover:text-white font-bold select-none",
  "link-active":
    "uppercase bg-transparent text-active drop-shadow-md font-bold select-none",
  "link-disable": "uppercase text-silver cursor-not-allowed",
};

export const ButtonSize = {
  s: "w-full py-2 px-4 text-md flex items-center justify-center sm:py-1 sm:px-2 sm:text-xs md:py-2 md:px-4 z-10",
  "s-link": "text-md flex items-center justify-center sm:text-sm z-10",
  m: "w-full py-3 px-4 text-md flex items-center justify-center sm:py-2 sm:px-3 sm:text-sm md:py-3 md:px-4 z-10",
  l: "w-full py-3 px-4 text-base flex items-center justify-center sm:py-2 sm:px-3 sm:text-sm md:py-3 md:px-4 z-10",
};

export const ButtonWidth = {
  full: "w-full h-full flex items-center justify-center",
  120: "w-[120px] h-full flex items-center justify-center",
  max: "w-max h-max flex items-center justify-center",
};

export const ButtonPostion = {
  absolute: "absolute z-10",
};
