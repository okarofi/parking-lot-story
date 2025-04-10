const ParkingTicket = require("./parking-ticket");

class ParkingLot {
  constructor(capacity) {
    if (!capacity || capacity <= 0) {
      throw new Error("Capacity must >0");
    }

    this.capacity = capacity;
    this.parkedCars = new Map();
    this.ticketCounter = 1;
  }

  isFull() {
    return this.parkedCars.size >= this.capacity;
  }

  park(car) {
    if (this.isFull()) {
      return "Full Capacity";
    }

    const ticketNumber = `TICKET-${this.ticketCounter++}`;
    const ticket = new ParkingTicket(ticketNumber);

    this.parkedCars.set(ticketNumber, car);
    return ticket;
  }
}

module.exports = ParkingLot;
