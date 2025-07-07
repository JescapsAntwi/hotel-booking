# Hotel Booking Platform Frontend

A modern React frontend for the Hotel Booking Platform, integrating with the backend API for user authentication, room management, searching, and booking.

## Features

- User registration and login (JWT-based)
- List, search, and filter available hotel rooms
- Create, edit, and delete your own room listings
- Book available rooms for specific dates
- View your bookings
- Protected routes for authenticated users
- Responsive and user-friendly UI

## Tech Stack

- React (with hooks)
- Axios for API requests
- React Router for navigation
- Context API for authentication state

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- Backend API running (see backend README)

### Installation

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The app will run at [http://localhost:3000](http://localhost:3000) by default.

### API Configuration

- The frontend expects the backend API to be running at `http://localhost:5000/api`.
- To change this, edit `src/utils/api.js` and update the `baseURL`.

## Usage

- Register a new account or log in.
- Browse and search available rooms.
- If logged in, create, edit, or delete your own room listings.
- Book available rooms for your desired dates.
- View your bookings from the "My Bookings" page.

## Project Structure

- `src/components/` — UI components (forms, lists, etc.)
- `src/context/` — Auth context provider
- `src/utils/` — Axios API instance
- `src/App.js` — Main app and routing

# Hotel Booking Platform Backend API

A RESTful backend API for a hotel booking platform, built with Node.js, Express, PostgreSQL, and Sequelize. This API allows users to register, log in, create and manage hotel room listings, search/filter available rooms, and book rooms securely.

## Features

- User registration and login with JWT authentication
- Users can create, edit, and delete their own hotel room listings
- Search and filter available hotel rooms by location, price, and date
- Room booking with date overlap checks
- Input validation and robust error handling
- Relational database (PostgreSQL) with Sequelize ORM

## Tech Stack

- Node.js, Express
- PostgreSQL, Sequelize
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd hotel_booking
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_NAME=hotel_booking_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   ```
4. Sync the database tables:
   ```bash
   node src/utils/syncDb.js
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token

### Rooms

- `GET /api/rooms` — List/search/filter rooms (public)
- `POST /api/rooms` — Create a new room (authenticated)
- `PUT /api/rooms/:id` — Edit a room (authenticated, owner only)
- `DELETE /api/rooms/:id` — Delete a room (authenticated, owner only)

#### Room Search Query Parameters

- `location` — Filter by location
- `minPrice` — Minimum price
- `maxPrice` — Maximum price

### Bookings

- `POST /api/bookings` — Book a room (authenticated)
- `GET /api/bookings/available?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` — List available rooms for a date range

## Example Usage

### Register

```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{ "token": "<JWT_TOKEN>" }
```

### Create Room

```http
POST /api/rooms
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "title": "Cozy Suite",
  "description": "A nice room in the city center",
  "price": 120,
  "location": "Accra"
}
```

### Book Room

```http
POST /api/bookings
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "roomId": 1,
  "checkIn": "2024-07-01",
  "checkOut": "2024-07-05"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages for invalid input, authentication errors, and server errors.

## License

MIT
