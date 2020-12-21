import { shipTypes } from "./ships.js";

const randomNumber = (size = 5) => Math.floor(Math.random() * (size - (-1 * size) + 1) + (-1 * size));

export const randomShipCoords = (size = 10) => {
    const x = randomNumber(size);
    const z = randomNumber(size);

    // TODO: Add this to calculations...
    //const position = "vertical" | "horizontal";

    return {
        coord: {
          x,
          z
        }
    }
};
 
/**
 * creates fleet with every ship coord.
 */
export const createFleet = () => {
  const fleet = [];

  shipTypes.forEach((ship, index) => {
    let shipHaveCoord = false;

    while(!shipHaveCoord) {
      const shipCoord = randomShipCoords();

      // TODO: Move to separate helper
      const coordExists = fleet.some(fleetShip => {
        if(fleetShip.coord == null || fleetShip.coord.x == null || fleetShip.coord.z == null || fleetShip == null) {
          return false;
        }

        return fleetShip.coord.x === shipCoord.coord.x || fleetShip.coord.z === shipCoord.coord.z

      });

      if(!coordExists || index === 0) {
        shipHaveCoord = true;
        fleet.push(Object.assign(ship, shipCoord));
      }
    }

  });
  
  return fleet;
};
