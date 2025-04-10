const Car = require("./src/domain/car");
const ParkingLot = require("./src/domain/parkingLot");

const lot = new ParkingLot(2);
const myCar = new Car("B 1234 ABC");
const myCar2 = new Car("B 1264 ABC");
const myCar3 = new Car("B 5334 ABC");

console.log(lot.park(myCar));
console.log(lot.park(myCar2));
console.log(lot.park(myCar3));
