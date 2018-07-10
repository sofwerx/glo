export default function(state=[], action) {
  switch (action.type) {
    case "LOCATION_LOADED":
      return action.data;
    default:
      return state;
  }
}