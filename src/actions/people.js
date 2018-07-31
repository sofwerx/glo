import fetch from 'isomorphic-fetch';

export function loadPeople(AuthToken, UIC) {
  return async dispatch => {
    try {
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({AuthToken, UIC}),

      };
      const response = await fetch('/ForceMgmtService/GetUnitPAX', options);
      const data = await response.json();
      const { requestOK, PAXList } = data;
      if (requestOK) {
        dispatch({ type: 'PEOPLE_LOADED', data: PAXList });
      }
      // onSuccess(data);
    } catch (err) {
      // onError();
    }
  }
}
