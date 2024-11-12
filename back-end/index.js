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
import { Server } from "socket.io";
import http from "http";
import path from "path";
import Showtime from "./models/Showtime.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// API-rutter
app.use("/api/auth", router);
app.use("/api/hall", hallrouter);
app.use("/api/movie", movierouter);
app.use("/api/user", userRouter);
app.use("/api/showtime", showtimeRouter);
app.use("/api/ticket", ticketRouter);

// Om servern körs i produktionsläge, servera front-end-builden
if (process.env.NODE_ENV === "production") {
  const frontEndBuildPath = path.resolve("front-end", "dist");
  app.use(express.static(frontEndBuildPath));

  // För alla andra förfrågningar, returnera index.html från front-end
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontEndBuildPath, "index.html"));
  });
}

// Skapa HTTP-server och Socket.io-server
const server = http.createServer(app);
const io = new Server(server);

// Socket.io-anslutningar
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("book-seat", async (seatId, showtimeId) => {
    try {
      await updateSeatStatus(seatId, showtimeId);
      io.emit("seat-booked", seatId);
    } catch (error) {
      console.error("Error booking seat:", error);
      socket.emit("booking-error", { message: "Failed to book seat" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Funktion för att uppdatera platsstatus i databasen
async function updateSeatStatus(seatId, showtimeId) {
  try {
    const updatedShowtime = await Showtime.findOneAndUpdate(
      {
        _id: showtimeId,
        "seats.seat": seatId,
      },
      {
        $set: {
          "seats.$.isBooked": true,
        },
      },
      { new: true }
    );

    if (!updatedShowtime) {
      throw new Error("Showtime or seat not found");
    }

    const updatedSeat = updatedShowtime.seats.find(
      (seat) => seat.seat.toString() === seatId
    );

    io.emit("seat-status-updated", updatedSeat);
    return updatedSeat;
  } catch (error) {
    console.error("Error updating seat status:", error);
    throw error;
  }
}

// Starta servern och anslut till databasen
server.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log("Server started at", process.env.PORT);
  } catch (error) {
    console.error("Server failed to start");
    process.exit(1);
  }
});
