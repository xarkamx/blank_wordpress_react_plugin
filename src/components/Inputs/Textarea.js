import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./scss/textarea.scss";
import { optionalFn } from "../../Core/helpers";
/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton = () => <span className="octicon octicon-star" />;

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1" />
      <option value="2" />
      <option value="" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select defaultValue="" className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="white" />
      <option value="" />
    </select>
    <select defaultValue="" className="ql-background">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="white" />
      <option value="" />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

/*
 * Textarea component with custom toolbar and content containers
 */
export class Textarea extends React.Component {
  constructor(props) {
    super(props);
    let value = props.value || "";
    value = value.replace(/(?:\r\n|\r|\n)/g, "<br>");
    this.state = { value: value || "" };
  }

  handleChange = (html) => {
    this.setState({ value: html });
    optionalFn(this.props.onChange)(encodeURIComponent(html));
  };

  render() {
    const { title } = this.props;
    return (
      <div style={{ margin: "20px 15px" }}>
        <label>{title}</label>
        <div className="text-editor">
          <CustomToolbar />
          <ReactQuill
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            modules={Textarea.modules}
          />
        </div>
      </div>
    );
  }
}

/*
 * Quill modules to attach to Textarea
 * See http://quilljs.com/docs/modules/ for complete options
 */
Textarea.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar,
    },
  },
};

/*
 * Quill Textarea formats
 * See http://quilljs.com/docs/formats/
 */
Textarea.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "colorClass",
];
