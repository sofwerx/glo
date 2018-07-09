// import fetch from 'isomorphic-fetch';

export function loadUnits() {
  return {
    type: "UNITS_LOADED",
    data: [{ name: "test" }, { name: "test2" }]
  };
}
