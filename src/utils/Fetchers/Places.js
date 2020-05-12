import { AFIO } from "./../AsyncFetch/AsyncFetch";
export class Places {
  url = "https://wft-geo-db.p.rapidapi.com/v1/geo/";
  authToken = "";

  constructor(auth) {
    this.authToken = auth;
    this.headers = {
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key": this.authToken,
    };
  }
  async getCountries(namePrefix = "") {
    let fetch = new AFIO(this.url + "countries");
    fetch.setHeaders(this.headers);
    return (await fetch.get({ languageCode: "es", limit: 10, namePrefix }))
      .data;
  }
  async getStates(country, namePrefix = "") {
    let fetch = new AFIO(this.url + `countries/${country}/regions`);
    fetch.setHeaders(this.headers);
    return (await fetch.get({ languageCode: "es", limit: 10, namePrefix }))
      .data;
  }
  async getCities(country, state, namePrefix = "") {
    let fetch = new AFIO(
      this.url + `countries/${country}/regions/${state}/cities`
    );
    fetch.setHeaders(this.headers);
    return (await fetch.get({ languageCode: "es", limit: 10, namePrefix }))
      .data;
  }
}
