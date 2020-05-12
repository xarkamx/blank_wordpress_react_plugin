import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { optionalFn } from "../../Core/helpers";

export function ColorPicker({ title, color, onChange }) {
  const [colorSelection, setColor] = useState(color);
  return (
    <div
      style={{
        padding: "12px",
        margin: "auto",
        display: "flex",
        alignContent: "center",
      }}
    >
      <div style={{ width: "fit-content", margin: "auto" }}>
        <div>
          <strong
            key={colorSelection}
            style={{
              color: colorSelection.hex || color,
              textTransform: "full-width capitalize",
              padding: "12px",
            }}
          >
            {title}
          </strong>
        </div>
        <SketchPicker
          color={colorSelection}
          onChangeComplete={(color) => {
            setColor(color);
            optionalFn(onChange)(color);
          }}
        />
      </div>
    </div>
  );
}
