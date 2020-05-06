import React, { Component } from "react";
import "./scss/all.min.scss";
export class FontIcon extends Component {
  render() {
    const { icon, ...rest } = this.props;
    return <i className={`fa fa-${icon}`} {...rest} />;
  }
}
