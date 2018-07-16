export default function(state = { authenticated: false, errorMsg: null, authToken: null }, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authenticated: true, errorMsg: null, authToken: action.data };
    case "LOGOUT":
      return { ...state, authenticated: false, authToken: null };
    case "INVALID_LOGIN":
      return { ...state, authenticated: false, authToken: null, errorMsg: "Incorrect username or password."}
    default:
      return state;
  }
}
