import React, { useState, useEffect } from "react";
import { GridContainer, GridItem } from "../Grid/Grid";

import { ReactSVG } from "react-svg";
import { optionalFn } from "../../Core/helpers";
import "./scss/inputs.scss";
import { Tooltip } from "../Formats/Tooltip";
/*eslint eqeqeq: 0*/
export function CheckerList({ options, onSelect }) {
  const [selected, setSelected] = useState("");
  return (
    <GridContainer className="checkerList">
      {options.map(({ icon, name, values, tooltip }, key) => {
        return (
          <GridItem xs={4} s={4}>
            <Tooltip message={tooltip}>
              <FancyChecker
                key={key}
                icon={icon}
                label={name}
                checked={selected == key}
                onClick={() => {
                  optionalFn(onSelect)(values);
                  setSelected(key);
                }}
              />
            </Tooltip>
          </GridItem>
        );
      })}
    </GridContainer>
  );
}
export function FancyChecker({ icon, label, onClick, checked }) {
  const [check, toggleCheck] = useState(checked);
  useEffect(() => {
    toggleCheck(checked);
  }, [checked]);
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        toggleCheck(1);
        optionalFn(onClick)();
      }}
      className={`checker ${check && "active"}`}
    >
      <div>
        <ReactSVG src={icon}></ReactSVG>
      </div>
      <div>{label} </div>
    </div>
  );
}
