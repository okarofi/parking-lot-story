class ParkingAttendant {
  constructor(parkingLot = []) {
    if (!Array.isArray(parkingLot) || parkingLot.length === 0) {
      throw new Error("At least one parking lot is required");
    }
    this.parkingLot = parkingLot;
    this.carTicketMap = new Map();
    this.ticketLotMap = new Map();
  }

  park(car) {
    if (this.carTicketMap.has(car.plate)) {
      return "Car is already parked";
    }

    for (const lot of this.parkingLot) {
      if (!lot.isLotFull()) {
        const ticket = lot.park(car);
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
