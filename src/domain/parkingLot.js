const ParkingTicket = require("./parking-ticket");

class ParkingLot {
  constructor(capacity, name = "LOT") {
    if (!capacity || capacity <= 0) {
      throw new Error("Capacity must >0");
    }

    this.name = name;
    this.capacity = capacity;
    this.parkedCars = new Map();
    this.ticketCounter = 1;
  }

  isLotFull() {
    return this.parkedCars.size >= this.capacity;
  }

  park(car) {
    if (this.isLotFull()) {
      return "Full Capacity";
    }

    const ticketNumber = `${this.name}-TICKET-${this.ticketCounter++}`;
    const ticket = new ParkingTicket(ticketNumber);

    this.parkedCars.set(ticketNumber, car);
    return ticket;
  }
  unpark(ticketNumber) {
    const car = this.parkedCars.get(ticketNumber);

    if (!car) {
      return "Ticket not found";
    }

    this.parkedCars.delete(ticketNumber);
    return car;
  }
}

module.exports = ParkingLot;
