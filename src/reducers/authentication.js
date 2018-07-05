export default function(state = { authenticated: false }, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authenticated: true };
    case "LOGOUT":
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
