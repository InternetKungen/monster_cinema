import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import router from "./routes/auth.js";
import hallrouter from "./routes/hall.js";
import movierouter from "./routes/movie.js";
import userRouter from "./routes/user.js";
import showtimeRouter from "./routes/showtime.js";
import ticketRouter from "./routes/ticket.js";
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/hall", hallrouter);
app.use("/api/movie", movierouter);
app.use("/api/user", userRouter);
app.use("/api/showtime", showtimeRouter);
app.use("/api/ticket", ticketRouter);
app.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log("Server started at", process.env.PORT);
  } catch (error) {
    console.error("Server failed to start");
    process.exit(1);
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Din frontend-URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('book-seat', (seatId, showtimeId) => {
    // Uppdatera databasen och signalera till alla anslutna klienter
    updateSeatStatus(seatId, showtimeId, true);
    io.emit('seat-booked', seatId, showtimeId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

async function updateSeatStatus(seatId, showtimeId, isBooked) {
  // Uppdatera sätets status i databasen
  await Seat.findOneAndUpdate(
    { _id: seatId, showtime: showtimeId },
    { isBooked },
    { new: true }
  );

  // Skicka en "seat-booked"-händelse till alla anslutna klienter
  io.emit('seat-booked', seatId, showtimeId);
}