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

export function selectUnit(unit) {
    return {
        type: 'SELECT_UNIT',
        data: unit
    }
}