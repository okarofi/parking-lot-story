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
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((fn) => fn !== callback);
  }

  notifyFull() {
    this.subscribers.forEach((fn) => fn(this, true));
  }

  notifyAvailable() {
    this.subscribers.forEach((fn) => fn(this, false));
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

    if (this.isLotFull()) {
      this.notifyFull();
    }

    return ticket;
  }

  unpark(ticketNumber) {
    const car = this.parkedCars.get(ticketNumber);

    if (!car) {
      return "Ticket not found";
    }

    this.parkedCars.delete(ticketNumber);

    if (!this.isLotFull()) {
      this.notifyAvailable();
    }

    return car;
  }
}

module.exports = ParkingLot;
