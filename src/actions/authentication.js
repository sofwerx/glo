import fetch from "isomorphic-fetch";

function submitActionCreator(url) {
  return (body, onSuccess, onError) => async dispatch => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(body)
      };
      const response = await fetch(url, options);
      const data = await response.json();
      onSuccess(data);
    } catch (err){
      onError();
    }
  };
}

export function login({ formData }) {
  return submitActionCreator("/auth")(
    formData,
    () => {
      return {
        type: "LOGIN",
        data: formData
      };
    },
    () => {
      return { type: "INVALID_LOGIN" };
    }
  );
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}
