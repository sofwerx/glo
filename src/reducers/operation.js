const defaultState = {
  step: 0,
  currentDeploymentIndex: -1,
  deployments: [],
  unit: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return {...defaultState}
    case "LOGOUT":      
      return {step: 0, currentDeploymentIndex: -1, deployments: [] , unit: null};
    case "SELECT_UNIT":
      return { ...state, unit: action.data };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };
    case "SELECT_DEPLOYMENT":
      return { ...state, currentDeploymentIndex: action.data, step: 2 };
    case "ADD_DEPLOYMENT":
      const newDeploymentState = { ...state, step: 2, currentDeploymentIndex: state.currentDeploymentIndex + 1 };
      newDeploymentState.deployments.push({});
      return newDeploymentState;
    case "UPDATE_DEPLOYMENT":
      const deployment = {
        ...state.deployments[state.currentDeploymentIndex],
        ...action.data
      };
      const newState = { ...state, step: 0 };
      newState.deployments[state.currentDeploymentIndex] = deployment;
      return newState;
    default:
      return state;
  }
}
