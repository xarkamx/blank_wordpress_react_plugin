import React, { useState } from "react";
import { optionalFn } from "../../Core/helpers";
import { FontIcon } from "../Icons/FontIcon";
/*eslint eqeqeq: 0*/
export function SimpleInput({ title, required, message, ...rest }) {
  return (
    <div className="simpleInput">
      <label>
        {`${title} ${required ? "*" : ""}`}
        <HelpInput message={message} />
      </label>
      <input required={required} {...rest} />
    </div>
  );
}
export function FormatSimpleInput({
  title,
  required,
  format,
  value,
  onBlur,
  message,
  ...rest
}) {
  const [editable, setEditable] = useState(0);
  return (
    <div className="simpleInput format">
      <label>
        {`${title} ${required ? "*" : ""}`}
        <HelpInput message={message} />
      </label>
      <input
        autoFocus={editable}
        required={required}
        value={value}
        style={{
          opacity: editable ? 1 : 0,
          position: editable ? "relative" : "fixed",
          top: !editable ? "0" : "inherit",
        }}
        {...rest}
        onFocus={() => {
          setEditable(1);
        }}
        onBlur={(ev) => {
          optionalFn(onBlur)(ev);
          setEditable(0);
        }}
      />
      {!editable && (
        <div
          onClick={() => {
            setEditable(1);
          }}
        >
          {format}
        </div>
      )}
    </div>
  );
}
export function HelpInput({ message }) {
  const [show, toggle] = useState(0);
  if (!message) {
    return "";
  }
  return (
    <span className="helpingMessage">
      <span
        className="question"
        onMouseEnter={(ev) => {
          toggle(1);
        }}
        onMouseLeave={() => {
          toggle(0);
        }}
      >
        <FontIcon icon="question-circle" />
      </span>
      {show ? <span className="helper">{message}</span> : ""}
    </span>
  );
}
