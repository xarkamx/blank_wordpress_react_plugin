import React, { useState } from "react";
import { optionalFn } from "../../Core/helpers";
import { FontIcon } from "../Icons/FontIcon";
import "./scss/inputs.scss";
/*eslint eqeqeq: 0*/
export function SimpleInput({
  title,
  required,
  onBlur,
  message,
  placeholder,
  errorMessage = "Invalid Field",
  children,
  ...rest
}) {
  const [error, setError] = useState(0);
  return (
    <div className={`simpleInput ${error ? "error" : ""}`}>
      <label>
        {`${title} ${required ? "*" : ""}`}
        <HelpInput message={message} />
      </label>
      <input
        onBlur={(ev) => {
          optionalFn(onBlur)(ev);
          if (ev.target.value == "") {
            return "";
          }
          if (!ev.target.checkValidity()) {
            setError(1);
          } else {
            setError(0);
          }
        }}
        required={required}
        {...rest}
      />
      {children}
      {error ? <p className="errorMessage">{errorMessage}</p> : ""}
      <p className="placeholder">{placeholder}</p>
    </div>
  );
}
export function FormatSimpleInput({
  title = "input",
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
export function autoCompleteInput({ ...rest }) {
  return (
    <SimpleInput {...rest}>
      <ul className="autoComplete">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </SimpleInput>
  );
}
