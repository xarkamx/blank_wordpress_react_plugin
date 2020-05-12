import React, { Component } from "react";
import { FontIcon } from "./../Icons/FontIcon";
import { Helpers } from "./../../Core/helpers";
export class UploaderInput extends Component {
  async getFile(ev) {
    const helpers = new Helpers();
    const file = ev.target.files[0];
    const b64 = await helpers.fileTo64(file);
    const fileData = {
      title: file.name,
      size: file.size,
      type: file.type,
      b64: b64.target.result,
    };
    this.props.onFileSelection(fileData);
  }
  render() {
    const { name } = this.props;
    return (
      <span>
        <label htmlFor={name} color="primary" className="btn btn-success">
          <FontIcon icon="upload" />
        </label>
        <input
          type="file"
          name={name}
          id={name}
          onChange={this.getFile.bind(this)}
          className="hidden"
        />
      </span>
    );
  }
}
