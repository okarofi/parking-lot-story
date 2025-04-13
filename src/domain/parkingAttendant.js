class ParkingAttendant {
  constructor(parkingLot = []) {
    if (!Array.isArray(parkingLot) || parkingLot.length === 0) {
      throw new Error("At least one parking lot is required");
    }

    this.parkingLot = parkingLot;
    this.availableLots = [...parkingLot];
    this.carTicketMap = new Map();
    this.ticketLotMap = new Map();

    for (const lot of this.parkingLot) {
      lot.subscribe(this.notifyLotFull.bind(this));
    }
  }

  notifyLotFull(lot, isFull) {
    const index = this.availableLots.indexOf(lot);
    if (isFull && index !== -1) {
      this.availableLots.splice(index, 1);
    } else if (!isFull && index === -1) {
      this.availableLots.push(lot);
    }
  }

  park(car) {
    if (this.carTicketMap.has(car.plate)) {
      return "Car is already parked";
    }

    for (const lot of this.availableLots) {
      const ticket = lot.park(car);
      if (ticket !== "Full Capacity") {
        this.carTicketMap.set(car.plate, ticket.ticketNumber);
        this.ticketLotMap.set(ticket.ticketNumber, lot);
        return ticket;
      }
    }

    return "All parking lots are full";
  }

  unpark(ticketNumber) {
    const lot = this.ticketLotMap.get(ticketNumber);
    if (!lot) return "Ticket not found";

    const car = lot.unpark(ticketNumber);
    if (car === "Ticket not found") return car;

    this.carTicketMap.delete(car.plate);
    this.ticketLotMap.delete(ticketNumber);
    return car;
  }
}

module.exports = ParkingAttendant;
