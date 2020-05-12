import React, { Component } from "react";
import { UploaderInput } from "./UploaderInput";
import { FontIcon } from "../Icons/FontIcon";
import "./scss/cam.scss";
import { insteadIMG } from "../../utils/Utils";
import { GridContainer, GridItem } from "./../Grid/Grid";
import { Camera } from "./../../Core/camera";
/* eslint eqeqeq: 0*/
/**
 * @description componente que permite tomar fotografias por medio de la webcam.
 */
export class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoStart: props.autoStart,
      photo: props.photo,
    };
  }
  componentWillReceiveProps(nxt) {
    if (nxt.photo != this.state.photo) {
      let photo = nxt.photo;
      this.setState({ photo });
    }
  }
  componentDidMount() {
    if (this.state.autoStart == true) {
      console.log("starting camera");
      this.startCam();
    }
  }
  startCam() {
    this.camera = new Camera({
      video: this.refs.video,
      canvas: this.refs.canvas,
    });

    this.camera.start();
  }
  async showCam() {
    //this.camera.stop();
    await this.setState({ photo: null });
    this.startCam();
  }
  componentWillUnmount() {
    if (this.camera) {
      this.camera.stop();
    }
  }
  takePic() {
    let foto = this.camera.takePicture(600, 450);
    this.setState({ photo: foto });
    this.onPhotoTaken(foto);
  }
  getLocalPic(fileData) {
    this.setState({ photo: fileData.b64 });
    this.onPhotoTaken(fileData.b64);
  }
  onPhotoTaken(photo) {
    if (this.camera) this.camera.stop();
    if (this.props.onPhotoTaken != undefined) {
      this.props.onPhotoTaken(photo);
    }
  }
  render() {
    const { photo } = this.state;
    const { noCam, title } = this.props;

    return (
      <>
        <label>{title}</label>
        <div className="camera">
          {photo == null ? (
            <div ref="cam">
              <video id="video" ref="video" style={{ cursor: "url" }} />
              <GridContainer>
                {!noCam ? (
                  <GridItem xs={6}>
                    <FontIcon icon="camera" onClick={this.takePic.bind(this)} />
                  </GridItem>
                ) : (
                  ""
                )}

                <GridItem xs={noCam ? 12 : 6}>
                  <UploaderInput
                    name="imgFile"
                    onFileSelection={this.getLocalPic.bind(this)}
                  />
                </GridItem>
              </GridContainer>
            </div>
          ) : (
            <img
              src={insteadIMG(photo)}
              alt="cam content"
              onClick={this.showCam.bind(this)}
            />
          )}
          <canvas id="canvas" ref="canvas" className="hidden" />
        </div>
      </>
    );
  }
}
