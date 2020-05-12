import React from "react";
import {
  Helpers,
  optionalFn,
  checkRequiredContent,
} from "./../../Core/helpers";
import { AFIO } from "../../utils/AsyncFetch/AsyncFetch";
export class AsyncForm extends React.Component {
  state = { status: "idle" };
  constructor(props) {
    super(props);
  }
  //funcion encargada de preparar el entorno
  willSubmit = (ev) => {
    ev.preventDefault();
    let target = ev.target;
    this.setState({ status: "validating" });
    let inputs = new Helpers().inputsToObject(target);
    inputs = optionalFn(this.props.willSubmit)(inputs) || inputs;
    this.onSubmission(inputs);
  };
  onSubmission = async (content) => {
    let fetch = new AFIO(this.props.path);
    this.setState({ status: "loading" });
    let data = await fetch.post(content);
    data = optionalFn(this.props.onSubmission)(data) || data;
    this.submitted(data);
  };
  componentDidMount() {
    let isRequired = checkRequiredContent(["path"], this.props);
  }
  submitted(response) {
    this.setState({ status: "idle" });
    optionalFn(this.props.submitted)(response);
  }

  render() {
    const { children } = this.props;
    return <form onSubmit={this.willSubmit}>{children}</form>;
  }
}
