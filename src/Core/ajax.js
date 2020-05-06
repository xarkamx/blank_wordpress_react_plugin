import { Helpers } from "./helpers";
export class Ajax extends Helpers {
  /**
   *
   * @param {*} path
   * @param {*} parameters
   * @param {*} method
   * @param {*} headers
   */
  async fetchData(
    path,
    parameters = {},
    method = "get",
    headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  ) {
    const data = await this._fetch(path, parameters, method, headers);
    let result = await data.text();
    try {
      return JSON.parse(result);
    } catch (e) {
      console.log("Error en backend");
      return { data: [] };
    }
  }
  async fetchFile(path) {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const data = await this._fetch(path, {}, "get", headers);
    const blob = await data.blob();
    blob.lastModifiedDate = new Date();
    blob.name = this.pathSlicer(path).fileName;
    return blob;
  }
  async fetchHTML(path) {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const data = await this._fetch(path, {}, "get", headers);
    return await data.text();
  }
  async _fetch(path, parameters, method, headers) {
    parameters = this.objectToSerialize(parameters);
    let args = {
      headers
    };
    if (method.toLowerCase() === "get") {
      path += "?" + parameters;
      parameters = "";
    } else {
      args.body = parameters;
    }
    args.method = method;
    return await fetch(path, args);
  }
}
