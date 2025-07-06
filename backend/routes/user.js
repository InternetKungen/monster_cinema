import express from "express";
import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Booking from "../models/Booking.js";
import { authUser } from "../middlewares/authUser.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";
import {
  getTickets,
  getUserInfo,
  removeTicket,
  userInfoByTicket,
  updateProfile,
  updatePassword,
} from "../controllers/userController.js";
import {
  createBooking,
  getAvailableSeats,
} from "../controllers/bookingController.js";
const userRouter = express.Router();

//Authenticated routes----------------
//Profile routes-----------
userRouter.get("/info", authUser, getUserInfo);

//update profile
userRouter.post("/update-profile", authUser, updateProfile);

//update password
userRouter.post("/update-password", authUser, updatePassword);

// Booking routes-----------
// remove a booking by booking number -- changed from /api/user/remove-ticket
userRouter.delete("/cancel-booking/:bookingNumber", authUser, removeTicket);

// get all bookings of a user
// /api/user/bookings -- changed from /api/user/tickets
userRouter.get("/bookings", authUser, getTickets);

// get user info by ticket booking number - for admins? - NOT USED
// /api/user/ticket/:bookingNumber
userRouter.get("/ticket/:bookingNumber", authUser, userInfoByTicket);

// Non-authenticated routes----------------
userRouter.get("/booking/:showtimeId/seats", getAvailableSeats);
// Create a booking
userRouter.post("/bookings", createBooking); //No token needed

export default userRouter;
