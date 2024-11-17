import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Booking from "../models/Booking.js";
import { authUser } from "../middlewares/authUser.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";
import User from "../models/User.js";
import { updateSeatStatus } from "../utils/seatUtils.js";

export const removeTicket = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingNumber: req.params.bookingNumber,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    // Find the specific showtime document that has the given showtime
    const showtimeDoc = await Showtime.findOne({
      movie: booking.movie,
      hall: booking.hall,
      date: booking.bookedAt.map((ba) => ba.date),
      time: booking.bookedAt.map((ba) => ba.time),
    });
    if (!showtimeDoc) {
      return res.status(400).json({ error: "Showtime does not exist" });
    }
    // Update each seat in the showtime document
    try {
      await Promise.all(
        showtimeDoc.seats.map(async (showtimeSeat) => {
          // Check if this seat is one of the booked seats
          if (booking.seats.includes(showtimeSeat.seat._id.toString())) {
            showtimeSeat.isBooked = false;

            // Pass the complete seat object from showtime to updateSeatStatus
            await updateSeatStatus(
              showtimeSeat.seat._id, // The actual Seat document ID
              showtimeDoc._id, // The Showtime document ID
              false // isBooked status
            );
          }
        })
      );
    } catch (updateError) {
      console.error("Error updating seat status:", updateError);
      return res.status(500).json({ error: "Error updating seats" });
    }

    // Update seats in the Seat collection
    const selectedSeats = await Seat.find({ _id: { $in: booking.seats } });
    await Promise.all(
      selectedSeats.map(async (seat) => {
        seat.isBooked = false;
        return seat.save();
      })
    );

    // Save the showtime document
    await showtimeDoc.save();

    // Delete the booking and update user's bookings
    await Booking.deleteOne({ _id: booking._id });
    const user = await User.findById(req.user._id);
    if (user) {
      user.bookings = user.bookings.filter(
        (b) => b.toString() !== booking._id.toString()
      );
      await user.save();
    }

    res.status(200).json({ message: "Ticket removed successfully" });
  } catch (error) {
    console.error("Error removing ticket:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getTickets = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("movie")
      .populate("hall")
      .exec();
    if (bookings.length === 0) {
      return res.status(404).json({ error: "No tickets found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching tickets:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

export const userInfoByTicket = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingNumber: req.params.bookingNumber,
    })
      .populate("movie")
      .populate("hall")
      .exec();
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching ticket:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookings").exec();
    console.log("User info endpoint hit");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the password field from the user object
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ user: userWithoutPassword });
    console.log("User info sent");
  } catch (error) {
    console.error("Error fetching user info:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    const { password: _, ...updatedUser } = user.toObject();
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
