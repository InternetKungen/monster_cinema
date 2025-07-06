import express from "express";
import {
  createTicketType,
  getTicketTypes,
  updateTicketType,
  deleteTicketType,
} from "../controllers/ticketController.js";
import { authUser } from "../middlewares/authUser.js";
import { isAuthAdmin } from "../middlewares/isAuthAdmin.js";

const ticketRouter = express.Router();

// Get all ticket types
ticketRouter.get("/", getTicketTypes);

// Create a new ticket type
ticketRouter.post("/", authUser, isAuthAdmin, createTicketType);

// Update a ticket type
ticketRouter.put("/:id", authUser, isAuthAdmin, updateTicketType);

// Delete a ticket type
ticketRouter.delete("/:id", authUser, isAuthAdmin, deleteTicketType);

export default ticketRouter;
