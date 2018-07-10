// import fetch from 'isomorphic-fetch';

export function loadLocation() {
  return {
    type: "LOCATION_LOADED",
    data: [{ name: "blah" }, { name: "blah2" }]
  };
}