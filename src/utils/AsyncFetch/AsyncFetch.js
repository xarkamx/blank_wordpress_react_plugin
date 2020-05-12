import { Ajax } from "./../../Core/ajax";
import { Helpers } from "../../Core/helpers";
export class AFIO extends Ajax {
  path = "";

  /**
   * @description define el path que sera utilizado por AuthFetch
   * @param string path direccion a donde apunta el fetch. ex: 'api/ejemplo'.
   */

  constructor(path) {
    super();
    this.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    this.path = path;
  }
  /**
   * añade o substituye headers
   * @param {*} headers
   */
  setHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
  }
  /**
   * @description obtiene datos de manera asyncrona
   * @param {*} parameters
   * @return Promise
   */
  async get(parameters = {}) {
    const data = await this._fetch(parameters, "get");
    //const path = this._setPath(parameters);
    //localStorage.setItem(path, btoa(JSON.stringify(data)));
    return data;
  }
  /**
   * @description envia por medio del metodo post los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async post(parameters = {}) {
    return this._fetch(parameters, "post");
  }
  /**
   * @description envia por medio del metodo put los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async put(parameters = {}) {
    return this._fetch(parameters, "put");
  }
  /**
   * @description envia por medio del metodo delete los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async delete(parameters = {}) {
    return this._fetch(parameters, "delete");
  }
  /**
   * @description Obtiene informacion guardada en cache basada en el path asignado al crear el objeto.
   * @param {*} parameters
   * @returns {}
   */

  _setPath(parameters) {
    const helpers = new Helpers();
    const path = this.path + "?" + helpers.objectToSerialize(parameters);
    return btoa(path);
  }
  async _fetch(parameters, method) {
    const response = await new Ajax().fetchData(
      this.path,
      parameters,
      method,
      this.headers
    );
    //this.hasError(response);
    return response;
  }
}
