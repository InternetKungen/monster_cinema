// scheduleShowtimes.js

import { showtimeGenerator } from "./showtimeGenerator.js";

// Generera showtimes för nästa vecka
const generateShowtimesForNextWeek = async () => {
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    await showtimeGenerator.generateShowtimesForDay(
      date.toISOString().split("T")[0]
    );
  }
};

// Schemalägg generering en gång per dag vid midnatt
const scheduleDailyShowtimeGeneration = () => {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const timeToMidnight = tomorrow - now;

  setTimeout(async () => {
    await generateShowtimesForNextWeek();
    scheduleDailyShowtimeGeneration(); // Schemalägg nästa körning
  }, timeToMidnight);
};

// Initiera schemaläggning
export const initializeShowtimeScheduler = () => {
  scheduleDailyShowtimeGeneration();
};
