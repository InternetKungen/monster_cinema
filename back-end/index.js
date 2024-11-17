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
// import Showtime from "./models/Showtime.js";
import path from "path";
import { updateSeatStatus } from "./utils/seatUtils.js";

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

// Servera statiska filer från dist-mappen
const distPath = path.resolve("..", "front-end", "dist");
app.use(express.static(distPath));

// Serve index.html på icke-API-vägar för att stödja SPA-routning
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Skapa HTTP-server och Socket.io-server
const server = http.createServer(app);
export const io = new Server(server);

// Socket.io-anslutningar
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("book-seat", async (seatId, showtimeId) => {
    try {
      // Uppdatera databasen och signalera till alla anslutna klienter
      await updateSeatStatus(seatId, showtimeId, true);
      // io.emit("seat-booked", seatId);
    } catch (error) {
      console.error("Error booking seat:", error);
      socket.emit("booking-error", { message: "Failed to book seat" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Starta servern
server.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log("Server started at", process.env.PORT);
  } catch (error) {
    console.error("Server failed to start");
    process.exit(1);
  }
});
