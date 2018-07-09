// import fetch from 'isomorphic-fetch';

export function loadPeople() {
  return {
    type: "PEOPLE_LOADED",
    data: [{ name: "Jim Bob" }, { name: "Bobby Joe" }]
  };
}
