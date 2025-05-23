const Car = require("./src/domain/car");
const ParkingAttendant = require("./src/domain/parkingAttendant");
const ParkingLot = require("./src/domain/parkingLot");

const lot1 = new ParkingLot(2, "LOT1");
const lot2 = new ParkingLot(2, "LOT2");

lot1.subscribe((lot, isFull) => {
  console.log(isFull ? `🚨 ${lot.name} is Full!` : `🚨 ${lot.name} available`);
});
lot2.subscribe((lot, isFull) => {
  console.log(isFull ? `🚨 ${lot.name} is Full` : `🚨 ${lot.name} available`);
});

const attendant = new ParkingAttendant([lot1, lot2]);

const Car1 = new Car("B 1234 ABC");
const Car2 = new Car("B 3264 ABC");
const Car3 = new Car("B 5334 ABC");
const Car4 = new Car("B 7324 ABC");

const ticket1 = attendant.park(Car1);
console.log("Car 1:", ticket1.ticketNumber);

const ticket2 = attendant.park(Car2);
console.log("Car 2:", ticket2.ticketNumber);

const ticket3 = attendant.park(Car3);
console.log("Car 3:", ticket3.ticketNumber);

// Coba parkir Car 1 lagi (seharusnya ditolak)
const ticket4 = attendant.park(Car1);
console.log("Car 4:", ticket4);

// Parkir Car4 (harusnya bisa, slot terakhir di Lot2)
const ticket5 = attendant.park(Car4);
console.log("Car 5:", ticket5.ticketNumber);

// Unpark Car1
const unparkedCar = attendant.unpark(ticket1.ticketNumber);
console.log("Car Out:", unparkedCar.plate);

// Coba unpark Car1 lagi (harusnya tidak bisa)
const unparkedCar2 = attendant.unpark(ticket1.ticketNumber);
console.log("Car Out:", unparkedCar2);

// Coba unpark pakai tiket palsu
const invalidUnpark = attendant.unpark("TICKET-666");
console.log("False Ticket:", invalidUnpark);
