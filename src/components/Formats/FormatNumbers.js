import React from "react";
import { numberToMoney } from "../../Core/helpers";
export function Money({ number, ...rest }) {
  return <span {...rest}>{numberToMoney(number)}</span>;
}
export function FixedNumber({ number, size = 2, ...rest }) {
  return (
    <span {...rest}>{!isNaN(number) ? number.toFixed(size) : "0.00"}</span>
  );
}
