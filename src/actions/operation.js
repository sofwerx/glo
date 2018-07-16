import fetch from "isomorphic-fetch";

export function nextStep() {
    return {
        type: 'NEXT_STEP'
    }
}

export function previousStep() {
    return {
        type: 'PREVIOUS_STEP'
    }
}

export function addDeployment() {
    return {
        type: 'ADD_DEPLOYMENT'
    }
}

export function updateDeployment(data) {
    return {
        type: 'UPDATE_DEPLOYMENT',
        data
    }
}

export function selectDeployment(idx) {
    return {
        type: 'SELECT_DEPLOYMENT',
        data: idx
    }
}

export function selectUnit(unit, authToken) {
    return async dispatch => {
        dispatch({
            type: 'SELECT_UNIT',
            data: unit
        })
        try {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ AuthToken: authToken, UIC: unit }),

            };
            const response = await fetch('/ForceMgmtService/GetUnitPAX', options);
            const data = await response.json();
            let { requestOK, PAXlist } = data;
            if (requestOK) {
                dispatch({ type: 'PEOPLE_LOADED', data: PAXlist });
            }

            const responseEquipment = await fetch('/ForceMgmtService/GetUnitTOE', options);
            const dataEquipment = await responseEquipment.json();
            if (dataEquipment.requestOK) {
                dispatch({ type: 'EQUIPMENT_LOADED', data: dataEquipment.EqipList });
            }
        } catch (err) {
        }
    }

}
