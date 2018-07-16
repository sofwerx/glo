import OPtempo from '../data/OPtempo';


export function loadOPtempo() {
  return {
    type: "OPTEMPO_LOADED",
    data: OPtempo
  };
}