import React, { useState, useReducer, useEffect } from "react";
import { Places } from "../../utils/Fetchers/Places";
import { optionalFn } from "../../Core/helpers";
import { AsyncSelector } from "./AsyncSelector";
import { AFIO } from "../../utils/AsyncFetch/AsyncFetch";
export function PlaceSelector() {
  const [status, setStatus] = useState(0);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      country: null,
      region: null,
      city: null,
      token: null,
    }
  );
  const getToken = async () => {
    let fetch = new AFIO("http://wp/wp-json/cr/v1/config");
    let data = await fetch.get({ keyname: "geo" });
    if (data.length > 0) {
      data = data[0];
      console.log(data.content);
      setState({ token: data.content });
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  if (state.token == null) {
    return <h1>Cargando...</h1>;
  }
  return (
    <>
      <CountrySelector
        onSearch={() => {
          setStatus(0);
        }}
        onChange={(values) => {
          setState({ country: values.value });
          setStatus(1);
        }}
        token={state.token}
      />
      {status >= 1 ? (
        <StateSelector
          token={state.token}
          onSearch={() => {
            setStatus(1);
          }}
          countryCode={state.country.code}
          onChange={(values) => {
            console.log(values);
            setState({ region: values.value });
            setStatus(2);
          }}
        />
      ) : (
        ""
      )}
      {status >= 2 ? (
        <CitySelector
          token={state.token}
          regionCode={state.region.isoCode}
          countryCode={state.country.code}
          onChange={() => {
            setStatus(3);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}
export function CountrySelector({ onChange, onSearch, token }) {
  var timeout = null;
  let loadPlaces = async (value) => {
    let countries = (await new Places(token).getCountries(value)) || [];
    return countries.map((item) => {
      console.log(item);
      return { value: item, label: item.name };
    });
  };
  let timer = (value) => {
    optionalFn(onSearch)(value);
    return new Promise((resolve) => {
      clearTimeout(timeout);
      console.log("cancel timeout");
      timeout = setTimeout(async () => {
        console.log("1 segundo");
        resolve(await loadPlaces(value));
      }, 2000);
    });
  };
  return (
    <AsyncSelector
      title="Páis"
      noOptionsMessage={() => "Sin coincidencias"}
      cacheOptions
      defaultOptions
      loadOptions={timer}
      onChange={onChange}
    />
  );
}
export function CitySelector({
  countryCode = "mx",
  regionCode = "jal",
  onChange,
  onSearch,
  token,
}) {
  var timeout = null;
  let loadPlaces = async (value) => {
    let cities =
      (await new Places(token).getCities(countryCode, regionCode, value)) || [];
    return cities.map((item) => {
      console.log(item);
      return { value: item, label: item.name };
    });
  };
  let timer = (value) => {
    optionalFn(onSearch)(value);
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        console.log("1 segundo");
        resolve(await loadPlaces(value));
      }, 2000);
    });
  };
  return (
    <AsyncSelector
      title="Ciudad"
      noOptionsMessage={() => "Sin coincidencias"}
      cacheOptions
      defaultOptions
      loadOptions={timer}
      onChange={onChange}
    />
  );
}
export function StateSelector({
  countryCode = "mx",
  onChange,
  onSearch,
  token,
}) {
  var timeout = null;
  let loadPlaces = async (value) => {
    let states = (await new Places(token).getStates(countryCode, value)) || [];
    return states.map((item) => {
      console.log(item);
      return { value: item, label: item.name };
    });
  };
  let timer = (value) => {
    optionalFn(onSearch)(value);
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        console.log("1 segundo");
        resolve(await loadPlaces(value));
      }, 2000);
    });
  };
  return (
    <AsyncSelector
      title="Estado"
      noOptionsMessage={() => "Sin coincidencias"}
      cacheOptions
      defaultOptions
      loadOptions={timer}
      onChange={onChange}
    />
  );
}
