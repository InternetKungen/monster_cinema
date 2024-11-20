# Front-end Project
![Skärmbild 2024-11-18 035621](https://github.com/user-attachments/assets/24470c92-7471-4d2e-b68b-9b01e37ca338)
Welcome to the official repository for MosterBio - a cinema website, which is a group project for our school course in front-end. 
Contributers in this repository are: 
- [InternetKungen](https://github.com/InternetKungen)
- [Roudi22](https://github.com/Roudi22)
- [tdunca](https://github.com/tdunca)
- [nyusufdot88](https://github.com/nyusufdot88)
- [hkarimm](https://github.com/hkarimm)
- [Nonthanan23](https://github.com/Nonthanan23)

## Visit the website here: 

## Requirements 
Feel free to read up on the requirements and user stories here: 
https://fe23-kyh.lms.nodehill.se/article/projektarbete-filmvisarna-fe23

## API Endpoints: 

<details>
  <summary>Expand API Endpoint Document</summary>
  <!--StartFragment-->


# API Endpoints Documentation

**Table of Contents: API Endpoints Documentation**

1. **Special Endpoints for Developers - Admin Auth**

   - Add Hall (POST /api/hall)

   - Delete All Halls (DELETE /api/hall) ⚠

   - Add Movie (POST /api/movie)

   - Delete All Movies (DELETE /api/movie) ⚠

   - Create Showtime (POST /api/showtime)

   - Update Showtime (PUT /api/showtime/{showtimeId})

   - Create Ticket Type (POST /api/ticket/)

   - Update Ticket Type (PUT /api/ticket/{ticketTypeId})

   - Delete Ticket Type (DELETE /api/ticket/{ticketTypeId})

2. **Endpoints**

   - **Movie Endpoints**

     - Add Movie (POST /api/movie)

     - Delete All Movies (DELETE /api/movie)

     - Get All Movies (GET /api/movie)

     - Get Movie by ID (GET /api/movie/{movieId})

   - **Showtime**

     - Create Showtime (POST /api/showtime)

     - Update Showtime (PUT /api/showtime/{showtimeId})

     - Get Showtime Filter Movie Date Range (GET /api/showtime?movieId={movieId}\&startDate=2024-11-20\&endDate=2024-11-27 )

     - Get All Showtimes Of Date Range (GET /api/showtime/date-range?startDate=2024-11-20\&endDate=2024-11-27)

     - Get Showtime By ID (GET /api/showtime/{showtimeId})

     - Get Seats of Showtime (GET /api/showtime/{showtimeId}}/seats)

   - **User Endpoints**
     
       **Auth**

     - Register User (POST /api/auth/register)

     - Login User (POST /api/auth/login)

     - Logout User (POST /api/auth/logout)

     - Reset Password (POST /api/auth/reset-password)
    
       **Booking**

     - Get All Bookings for a User (GET /api/user/bookings)

     - Create Booking (POST /api/user/bookings)

     - Cancel Booking (DELETE /api/user/cancel-booking/{bookingNumber})
       
       **Profile**

     - Get User Profile (GET /api/user/info)

     - Update User Profile (POST /api/user/update-profile)

     - Update User Password (POST /api/user/update-password)

   - **Hall Endpoints**

     - Add Hall (POST /api/hall)

     - Delete All Halls (DELETE /api/hall)

     - Get All Halls (GET /api/hall)

     - ~~Get Seat by ID (GET /api/hall/seat/{seatId}) - not used~~

     - ~~Get Seats for Showtime in Hall (GET /api/hall/{hallId}/showtime/{time}) - old structure - not used~~

   - **Ticket Endpoints**

     - Get All Ticket Types (GET /api/ticket/)

     - Create Ticket Type (POST /api/ticket/)

     - Update Ticket Type (PUT /api/ticket/{ticketTypeId})

     - Delete Ticket Type (DELETE /api/ticket/{ticketTypeId})


# **Special Endpoints for Developers**

## **Add Hall**

- **Method**: POST

- **URL**: /api/hall

**Request Body (JSON)**:

    {
        "hallNumber": "2",
        "hallName": "Lilla Salongen",
        "seatsPerRow": [
          6,
          8,
          9,
          10,
          10,
          12
        ]
      }

- **Expected Response**: Confirmation that the hall was added.


## **Delete All Halls ⚠**

- **Method**: DELETE

- **URL**: /api/hall

- **Expected Response**: Confirmation that all halls were deleted.


## **Add Movie**

- **Method**: POST

- **URL**: /api/movie

**Request Body (JSON)**:

    {
            "title": "They Live",
            "year": 1988,
            "length": 94,
            "description": "En arbetare upptäcker att världen är invaderad av utomjordingar som döljer sin sanna identitet...",
            "genre": [
                "Skräck",
                "Sci-Fi",
                "Action"
            ],
            "distributor": "Universal Pictures",
            "productionCountries": [
                "USA"
            ],
            "language": "engelska",
            "subtitles": "svenska",
            "director": "John Carpenter",
            "actors": [
                "Roddy Piper",
                "Keith David",
                "Meg Foster"
            ],
            "poster": "https://res.cloudinary.com/dwecng9uv/image/upload/v1728395274/they-live_ahfqy5.png",
            "trailer": "PeB3vdxF_jM",
            "ageRestriction": 15,
            "imdbRating": 7.2
        }

- **Expected Response**: Confirmation that the movie was added.


## **Delete All Movies ⚠**

- **Method**: DELETE

- **URL**: /api/movie

- **Expected Response**: Confirmation that all movies were deleted.


## **Create Showtime**

- **Method**: POST

- **URL**: /api/showtime

- **Expected Response**: Confirmation that showtime was created.

**Request Body (JSON)**:

    {
      "movieId": "6705398474ccca3d8e653c44",
      "hallId": "6708dfe0f3662fd636f527a5",
      "date": "2024-10-24",
      "time": "18:30"
    }


## **Update Showtime**

- **Method**: PUT

- **URL**: /api/showtime/{showtimeId}

- **Expected Response**: Confirmation that showtime was updated.

**Request Body (JSON)**:

    {
      "date": "2024-11-21",
      "time": "19:00"
    }


## **Create Ticket Type**

- **Method**: POST

- **URL**: /api/ticket/

- **Expected Response**: Confirmation that ticket type was created..

**Request Body (JSON)**:

    {
        "type": "Pensionär",
        "price": 120
    }


## **Update Ticket Type**

- **Method**: PUT

- **URL**: /api/ticket/{ticketTypeId}

- **Expected Response**: Confirmation that ticket type was updated.

**Request Body (JSON)**:

    {
        "type": "Vuxen",
        "price": 140
    }


## **Delete Ticket Type**

- **Method**: DELETE

- **URL**: /api/ticket/{ticketTypeId}

- **Expected Response**: Confirmation that ticket type was deleted..


# **Endpoints**

# **Movie Endpoints**

## **Add Movie**

- **Method**: POST

- **URL**: /api/movie

**Request Body (JSON)**:

    {
            "title": "They Live",
            "year": 1988,
            "length": 94,
            "description": "<p>En arbetare upptäcker att världen är invaderad av utomjordingar som döljer sin sanna identitet...</p>",
            "genre": [
                "Skräck",
                "Sci-Fi",
                "Action"
            ],
            "distributor": "Universal Pictures",
            "productionCountries": [
                "USA"
            ],
            "language": "engelska",
            "subtitles": "svenska",
            "director": "John Carpenter",
            "actors": [
                "Roddy Piper",
                "Keith David",
                "Meg Foster"
            ],
            "poster": "https://res.cloudinary.com/dwecng9uv/image/upload/v1728395274/they-live_ahfqy5.png",
            "trailer": "PeB3vdxF_jM",
            "ageRestriction": 15,
            "imdbRating": 7.2
        }

- **Expected Response**: Confirmation that the movie was added.


## **Delete All Movies**

- **Method**: DELETE

- **URL**: /api/movie

- **Expected Response**: Confirmation that all movies were deleted.


## **Get All Movies**

- **Method**: GET

- **URL**: /api/movie

- **Expected Response**: List of all movies.


## **Get Movie by ID**

- **Method**: GET

- **URL**: /api/movie/{movieId}

- **Expected Response**: Detailed information of the movie (title, description, rating, genre, director, etc.).


## ~~**Filter Movies by Date**~~ **-- not used**

- **Method**: GET

- **URL**: /api/movie/movies-by-date?selectedDate={date}

- **Expected Response**: List of movies showing on the selected date.


# **Showtime Endpoints**

## **Create Showtime**

- **Method**: POST

- **URL**: /api/showtime

**Request Body (JSON)**:

    {
      "movieId": "6705398474ccca3d8e653c44",
      "hallId": "6708dfe0f3662fd636f527a5",
      "date": "2024-03-20",
      "time": "18:30"
    }


## **Update Showtime**

- **Method**: PUT

- **URL**: /api/showtime/{showtimeId}

**Request Body (JSON)**:

    {
      "date": "2024-11-21",
      "time": "19:00"
    }


## **Get Showtime Filter Movie and Date Range**

- **Method**: GET

- **URL**: /api/showtime?movieId={movieId}\&startDate=2024-11-20\&endDate=2024-11-27


## **Get All Showtimes of Date Range**

- **Method**: GET

- **URL**: /api/showtime/date-range?startDate=2024-11-20\&endDate=2024-11-27


## **Get Seats of Showtime**

- **Method**: GET

- **URL**: /api/showtime/{showtimeId}}/seats


# **User Endpoints**

### Auth


## **Register User**

- **Method**: POST

- **URL**: /api/auth/register

**Request Body (JSON)**:

    {
        "email": "testar1@registrera.test",
        "password": "testar1",
        "firstName": "",
        "lastName": ""
    }

**Expected Response (200)**:

    {
        "message": "User registered successfully",
        "user": {
            "email": "testar12@registrera.test",
            "bookings": [],
            "firstName": "",
            "lastName": "",
            "role": "admin",
            "_id": "6717de0c69932a8dc143588a",
            "createdAt": "2024-10-22T17:17:00.669Z",
            "updatedAt": "2024-10-22T17:17:00.669Z",
            "__v": 0
        }
    }

**Error Response (400)**:

    {
       "error": "Error message"
    }


## **Login User**

- **Method**: POST

- **URL**: /api/auth/login

**Request Body (JSON)**:

    {
       "email": "email@email.com",
       "password": "password"
    }

**Expected Response (200)**:

    {
        "message": "User logged in successfully",
        "user": {
            "_id": "670bb7983fd1630377a0d4d7",
            "email": "email@email.com",
            "bookings": [
                "670e6116189aac5d6c5a78a3",
                "67162372dd59e74f562b7894",
                "671795948807675d53eb2bca"
            ],
            "createdAt": "2024-10-13T12:05:44.259Z",
            "updatedAt": "2024-10-22T12:27:08.992Z",
            "__v": 8,
            "role": "user"
        }
    }

- **Error Responses (400)**:

  - User does not exist

  - Invalid password

  - Failed to generate token


## **Logout User**

- **Method**: POST

- **URL**: /api/auth/logout

**Expected Response**:

    {
       "message": "User logged out successfully"
    }


## **Reset Password**

- **Method**: POST

- **URL**: /api/auth/reset-password

**Request Body (JSON)**:
```
{
   "email": "email\@email.com"
}
```
- **Expected Response**: Confirmation that the password was reset.

### Booking


## **Cancel Booking**

- **Method**: DELETE

- **URL**: /api/user/cancel-booking/{ticketId} (E2CA79)

- **Expected Response**: Confirmation that the booking was canceled.


## **Get All Tickets for a User**

- **Method**: GET

- **URL**: /api/user/bookings

- **Expected Response**: List of the user's booked tickets.


## **Create Booking**

- **Method**: POST

- **URL**: /api/user/bookings

**Request Body (JSON)**:

    {
      "showtimeId": "670875b63efff90b939ed90a",
      "selectedSeats": ["67078199c8a54ccb5e7e6e61", "67078199c8a54ccb5e7e6e62"],
      "email": "email@hotmail.com",
      "tickets": [
        {
          "type": "Vuxen",
          "quantity": 1
        },
        {
          "type": "Pensionär",
          "quantity": 0
        },
        {
          "type": "Barn",
          "quantity": 0
        }
      ]
    }

### Profile


## **Get User Profile**

- **Method**: GET

- **URL**: /api/user/info

- **Expected Response**:

<!---->

    {
        "_id": "670bb7983fd1630377a0d4d7",
        "email": "user@email.com",
        "bookings": [
            "670bcd8fa99f9c0b79380be0",
            "670cf59fb495ad3c72ee4c1a"
        ],
        "createdAt": "2024-10-13T12:05:44.259Z",
        "updatedAt": "2024-10-22T17:15:05.101Z",
        "__v": 9,
        "role": "user",
        "firstName": "John",
        "lastName": "Doe"
    }


## **Update User Profile**

- **Method**: POST

- **URL**: /api/user/update-profile

**Request Body (JSON)**:

    {
      "firstName": "John",
      "lastName": "Doe"
    }


## **Update Password**

- **Method**: POST

- **URL**: /api/user/update-password

**Request Body (JSON)**:

    {
       "oldPassword": "oldPassword",
       "newPassword": "newPassword"
    }

- **Expected Response**: Confirmation that the password was updated.


# **Hall Endpoints**

## **Add Hall**

- **Method**: POST

- **URL**: /api/hall

**Request Body (JSON)**:

    {
        "hallNumber": "2",
        "hallName": "Lilla Salongen",
        "seatsPerRow": [
          6,
          8,
          9,
          10,
          10,
          12
        ]
      }

- **Expected Response**: Confirmation that the hall was added.


## **Delete All Halls**

- **Method**: DELETE

- **URL**: /api/hall

- **Expected Response**: Confirmation that all halls were deleted.


## **Get All Halls**

- **Method**: GET

- **URL**: /api/hall

- **Expected Response**: List of all halls.


## ~~**Get Seats for Showtime in Hall**~~ **-- not used**

- **Method**: GET

- **URL**: /api/hall/{hallId}/showtime/{time}

**Expected Response**:

    {
       "_id": "showtimeId",
       "seats": [
          {
             "seat": "seatId",
             "isBooked": true,
             "_id": "seatId"
          }
       ]
    }


# **Ticket Endpoints**

## **Get All Ticket Types**

- **Method**: GET

- **URL**: /api/ticket/

- **Expected Response**: Lists all ticket types.

<!---->

    [
        {
            "_id": "6716c0da3a6e498a8a14605c",
            "type": "Vuxen",
            "price": 140,
            "__v": 0
        },
        {
            "_id": "6716c1053a6e498a8a14605e",
            "type": "Barn",
            "price": 80,
            "__v": 0
        },
        {
            "_id": "6716c13b3a6e498a8a146060",
            "type": "Pensionär",
            "price": 120,
            "__v": 0
        }
    ]


## **Create Ticket Type**

- **Method**: POST

- **URL**: /api/ticket/

- **Expected Response**: Ticket type created

**Request Body (JSON)**:\

    {
        "type": "Pensionär",
        "price": 120
    }


## **Update Ticket Type**

- **Method**: PUT

- **URL**: /api/ticket/6716c0da3a6e498a8a14605c

- **Expected Response**: Ticket type updated.

**Request Body (JSON)**:

    {
        "type": "Vuxen",
        "price": 140
    }


## **Delete Ticket Type**

- **Method**: DELETE

- **URL**: /api/ticket/6716c0da3a6e498a8a14605c

- **Expected Response**: Ticket type removed

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



<!--EndFragment-->

</details>
