export default function(state=[], action) {
    switch (action.type) {
      case "OPTEMPO_LOADED":
        return action.data;
      default:
        return state;
    }
  }
  