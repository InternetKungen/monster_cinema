// utils/seatUtils.js
import Showtime from "../models/Showtime.js";
import { io } from "../index.js";

export async function updateSeatStatus(seatId, showtimeId, status) {
  try {
    const updatedShowtime = await Showtime.findOneAndUpdate(
      {
        _id: showtimeId,
        "seats.seat": seatId,
      },
      {
        $set: {
          "seats.$.isBooked": status,
        },
      },
      { new: true }
    );

    if (!updatedShowtime) {
      throw new Error("Showtime or seat not found");
    }

    const updatedSeat = updatedShowtime.seats.find(
      (seat) => seat.seat.toString() === seatId.toString()
    );

    // Emittera datan i samma format som klienten förväntar sig
    io.emit("seat-status-updated", {
      _id: updatedSeat._id, // Använd sätets _id från showtime
      isBooked: status, // Använd status som skickades in
    });

    return updatedSeat;
  } catch (error) {
    console.error("Error updating seat status:", error);
    throw error;
  }
}
