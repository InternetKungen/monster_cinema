import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Showtime from "../models/Showtime.js";
import Seat from "../models/Seat.js";

class ShowtimeGenerator {
  constructor() {
    this.isActive = false;
    this.openingHours = {
      1: { start: "08:00", end: "21:00" }, // Måndag
      2: { start: "08:00", end: "21:00" }, // Tisdag
      3: { start: "08:00", end: "21:00" }, // Onsdag
      4: { start: "08:00", end: "21:00" }, // Torsdag
      5: { start: "08:00", end: "23:59" }, // Fredag
      6: { start: "08:00", end: "23:59" }, // Lördag
      0: { start: "10:00", end: "23:59" }, // Söndag
    };
  }

  activate() {
    this.isActive = true;
    console.log("Showtime generator is active.");
  }

  deactivate() {
    this.isActive = false;
    console.log("Showtime generator is inactive.");
  }

  timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  isAgeAppropriate(movie, timeStr) {
    const minutes = this.timeToMinutes(timeStr);

    if (minutes < this.timeToMinutes("15:00")) {
      // 08:00 - 15:00: Endast filmer med ageRestriction <= 15
      return movie.ageRestriction <= 11;
    } else if (minutes < this.timeToMinutes("18:00")) {
      // 15:00 - 18:00: Alla filmer tillåtna
      return true;
    } else {
      // Efter 18:00: Endast filmer med ageRestriction >= 11
      return movie.ageRestriction >= 11;
    }
  }

  async generateShowtimesForDay(date) {
    if (!this.isActive) return;

    try {
      const dayOfWeek = new Date(date).getDay();
      const { start, end } = this.openingHours[dayOfWeek];

      const movies = await Movie.find();
      const halls = await Hall.find();

      for (const hall of halls) {
        let currentTime = this.timeToMinutes(start);
        const endTime = this.timeToMinutes(end);

        while (currentTime < endTime) {
          // Välj en slumpmässig film som passar tidskriteriet
          const appropriateMovies = movies.filter((movie) =>
            this.isAgeAppropriate(movie, this.minutesToTime(currentTime))
          );

          if (appropriateMovies.length === 0) {
            currentTime += 30; // Gå framåt 30 minuter om ingen lämplig film hittas
            continue;
          }

          const movie =
            appropriateMovies[
              Math.floor(Math.random() * appropriateMovies.length)
            ];

          // Kontrollera om tiden redan är bokad
          const timeStr = this.minutesToTime(currentTime);
          const conflict = await this.checkTimeConflict(
            hall._id,
            date,
            timeStr,
            movie.length
          );

          if (!conflict) {
            // Skapa showtime
            const showtime = {
              movieId: movie._id,
              hallId: hall._id,
              date: date,
              time: timeStr,
            };

            await this.createShowtime(showtime);
          }

          // Gå framåt filmens längd plus 30 minuter för städning
          currentTime += movie.length + 30;
        }
      }
    } catch (error) {
      console.error("Error generating showtimes:", error);
    }
  }

  async checkTimeConflict(hallId, date, time, movieLength) {
    const startTime = this.timeToMinutes(time);
    const endTime = startTime + movieLength;

    const existingShowtimes = await Showtime.find({
      hall: hallId,
      date: new Date(date),
    }).populate("movie");

    return existingShowtimes.some((showtime) => {
      const existingStart = this.timeToMinutes(showtime.time);
      const existingEnd = existingStart + showtime.movie.length;

      return startTime < existingEnd && endTime > existingStart;
    });
  }

  async createShowtime(showtimeData) {
    try {
      const { movieId, hallId, date, time } = showtimeData;

      // Hämta säten för salongen
      const seats = await Seat.find({ hall: hallId });

      const showtime = new Showtime({
        movie: movieId,
        hall: hallId,
        date: new Date(date),
        time,
        seats: seats.map((seat) => ({
          seat: seat._id,
          isBooked: false,
        })),
      });

      await showtime.save();
      return showtime;
    } catch (error) {
      console.error("Error creating individual showtime:", error);
      throw error;
    }
  }
}

// Exportera en singleton-instans
export const showtimeGenerator = new ShowtimeGenerator();

// Exempel på användning:
// Import i din index.js eller där du vill använda den:
// import { showtimeGenerator } from './showtimeGenerator.js';
//
// // Aktivera generatorn
// showtimeGenerator.activate();
//
// // Generera showtimes för ett specifikt datum
// await showtimeGenerator.generateShowtimesForDay('2024-11-22');
