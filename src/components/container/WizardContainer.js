import React, { useState, useEffect } from "react";
import { optionalFn } from "../../Core/helpers";
export function WizardContainer({
  children,
  onLoad,
  page = 0,
  onComplete,
  className,
  ...rest
}) {
  const [key, setKey] = useState(0);
  const [values, setContent] = useState([]);
  const childsCount = Array.isArray(children) ? children.length : 1;
  useEffect(() => {
    optionalFn(onLoad)({ pages: childsCount });
    setKey(page);
  }, [onLoad]);
  return (
    <div className={`WizardContainer ${className}`} {...rest}>
      <WizardLoader index={key}>{children}</WizardLoader>
    </div>
  );
}
export function WizardPage({ children, onSubmit, onLoad, onNext }) {
  return <div className="wizardItem">{children}</div>;
}

function WizardLoader({
  children,
  index,
  onPageSelection,
  type = "locked",
  ...rest
}) {
  let content = React.Children.map(children[index] || children, (child) => {
    return React.cloneElement(child, {
      ...rest,
    });
  });
  return <>{content}</>;
}
