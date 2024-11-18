# Front-end Project
![Skärmbild 2024-11-18 035621](https://github.com/user-attachments/assets/24470c92-7471-4d2e-b68b-9b01e37ca338)
Welcome to the official repository for MosterBio - a cinema website, which is a group project for our school course in front-end. 
Contributers in this repository are: 
- [internetKungen](https://github.com/InternetKungen)
- [roudi22](https://github.com/Roudi22)
- [tdunca](https://github.com/tdunca)
- [nyusufdot88](https://github.com/nyusufdot88)
- [hkarimm](https://github.com/hkarimm)
- [nonthanan23](https://github.com/Nonthanan23)

## Visit the website here: 

## Requirements 
Feel free to read up on the requirements set by our teacher here: 
https://fe23-kyh.lms.nodehill.se/article/projektarbete-filmvisarna-fe23

## EndPoints: 
Table of Contents: API Endpoints Documentation

Special Endpoints for Developers

Add Hall (POST /api/hall)

Delete All Halls (DELETE /api/hall) ⚠

Add Movie (POST /api/movie)

Delete All Movies (DELETE /api/movie) ⚠

Create Showtime (POST /api/showtime)

Update Showtime (PUT /api/showtime/{showtimeId})

Create Ticket Type (POST /api/ticket/)

Update Ticket Type (PUT /api/ticket/{ticketTypeId})

Delete Ticket Type (DELETE /api/ticket/{ticketTypeId})

Endpoints

Movie Endpoints

Add Movie (POST /api/movie)

Delete All Movies (DELETE /api/movie)

Get All Movies (GET /api/movie)

Get Movie by ID (GET /api/movie/{movieId})

Showtime

Create Showtime (POST /api/showtime)

Update Showtime (PUT /api/showtime/{showtimeId})

Get Showtime Filter Movie Date Range (GET /api/showtime?movieId={movieId}&startDate=2024-11-20&endDate=2024-11-27 )

Get All Showtimes Of Date Range (GET /api/showtime/date-range?startDate=2024-11-20&endDate=2024-11-27)

Get Showtime By ID (GET /api/showtime/{showtimeId})

Get Seats of Showtime (GET /api/showtime/{showtimeId}}/seats)

User Endpoints

Register User (POST /api/auth/register) 

Login User (POST /api/auth/login)

Logout User (POST /api/auth/logout)

Reset Password (POST /api/auth/reset-password)

Cancel Booking (DELETE /api/user/remove-ticket/{ticketId})

Get All Tickets for a User (GET /api/user/tickets)

Get User Profile (GET /api/user/info)

Create Booking (POST /api/user/bookings)

Update User Profile (POST /api/user/update-profile)

Hall Endpoints

Add Hall (POST /api/hall)

Delete All Halls (DELETE /api/hall)

Get All Halls (GET /api/hall)

Ticket Endpoints

Get All Ticket Types (GET /api/ticket/)

Create Ticket Type (POST /api/ticket/)

Update Ticket Type (PUT /api/ticket/{ticketTypeId})

Delete Ticket Type (DELETE /api/ticket/{ticketTypeId})
