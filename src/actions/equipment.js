// import fetch from 'isomorphic-fetch';

export function loadEquipment() {
  return {
    type: "EQUIPMENT_LOADED",
    data: [{ name: "Shovel" }, { name: "Bigger Shovel" }]
  };
}
