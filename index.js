const Car = require("./src/domain/car");
const ParkingLot = require("./src/domain/parkingLot");

const lot = new ParkingLot(2);
const Car1 = new Car("B 1234 ABC");
const Car2 = new Car("B 1264 ABC");
const Car3 = new Car("B 5334 ABC");

const ticket1 = lot.park(Car1);
console.log("Car 1:", ticket1.ticketNumber);

const ticket2 = lot.park(Car2);
console.log("Car 2:", ticket2.ticketNumber);

const ticket3 = lot.park(Car3);
console.log("Car 3:", ticket3);

const unparkedCar = lot.unpark(ticket1.ticketNumber);
console.log("Car Out:", unparkedCar.plate);

const invalidUnpark = lot.unpark("TICKET-999");
console.log("False Ticket:", invalidUnpark);
