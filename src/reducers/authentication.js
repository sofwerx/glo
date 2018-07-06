export default function(state = { authenticated: false, errorMsg: null }, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authenticated: true, errorMsg: null };
    case "LOGOUT":
      return { ...state, authenticated: false };
    case "INVALID_LOGIN":
      return {...state, authenticated: false, errorMsg: "Incorrect username or password."}
    default:
      console.debug(action)
      return state;
  }
}
