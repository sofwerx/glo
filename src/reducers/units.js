export default function (state = [], action) {
  switch (action.type) {
    case "UNITS_LOADED":
      return action.data.map(u => { return { name: u } });
    default:
      return state;
  }
}
