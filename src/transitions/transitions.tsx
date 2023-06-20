export const transitionClases = {
  opacity: {
    enter: "ease-out duration-100",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  },
  slide: {
    enter: "transform transition ease-in-out duration-500 sm:duration-700",
    enterFrom: "translate-x-full",
    enterTo: "translate-x-0",
    leave: "transform transition ease-in-out duration-500 sm:duration-700",
    leaveFrom: "translate-x-0",
    leaveTo: "translate-x-full",
  },
  opacity2: {
    enter: "ease-in-out duration-100",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in-out duration-500",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  },
};
