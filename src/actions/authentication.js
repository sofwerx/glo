export function login({ formData }) {
  console.log(formData);
  return {
    type: "LOGIN",
    data: formData
  };
}


export function logout() {
    return {
        type: "LOGOUT"
    }
}