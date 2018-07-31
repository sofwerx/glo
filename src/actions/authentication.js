import fetch from "isomorphic-fetch";

export function login({ formData }) {
  return async dispatch => {
    try {
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id: formData.username, pass: formData.password }),

      };
      const response = await fetch('/AuthService', options);
      const data = await response.json();
      const { authenticated, AuthToken, units} = data;
      if(authenticated) {
        dispatch( { type: 'LOGIN', data: AuthToken });
        dispatch({ type: 'UNITS_LOADED', data: units });
      }
       // onSuccess(data);
    } catch (err) {
      // onError();
    }
  }
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}
