import React from "react";
import AsyncSelect from "react-select/async";
export function AsyncSelector({ title = "Select", ...rest }) {
  return (
    <>
      <label>{title}</label>
      <AsyncSelect {...rest} />
    </>
  );
}
