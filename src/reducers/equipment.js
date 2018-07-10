export default function(state=[], action) {
  switch (action.type) {
    case "EQUIPMENT_LOADED":
      return action.data;
    default:
      return state;
  }
}
