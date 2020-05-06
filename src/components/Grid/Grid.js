import React, { useContext, useState, useEffect } from "react";
import { between } from "./../../Core/helpers";
const windowSizeContext = React.createContext();
export function GridContainer({ children, className, ...rest }) {
  const [sizes, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", ({ target }) => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    });
  }, []);
  return (
    <windowSizeContext.Provider value={sizes}>
      <div
        className={"gridContainer " + className}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(12 ,${100 / 12}%)`,
        }}
        {...rest}
      >
        {children}
      </div>
    </windowSizeContext.Provider>
  );
}
export function GridItem({
  children,
  xs = 12,
  s,
  md,
  lg,
  xl,
  style,
  className,
  ...rest
}) {
  const screen = useContext(windowSizeContext);
  return (
    <div
      className={`gridItem ${className}`}
      style={{
        gridColumn: `span ${_setSpanSize({ xs, s, md, lg, xl }, screen.width)}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
function _setSpanSize({ xs, s, md, lg, xl }, screenSize) {
  s = s || xs;
  md = md || s;
  lg = lg || md;
  xl = xl || md;
  let sizes = [
    { range: [0, 600], rt: xs },
    { range: [600, 1200], rt: s },
    { range: [1200, 1920], rt: md },
    { range: [1920, 2560], rt: lg },
    { range: [2560, Infinity], rt: xl },
  ];
  for (let pos of sizes) {
    if (between(screenSize, pos.range[0], pos.range[1])) {
      return pos.rt;
    }
  }
}
