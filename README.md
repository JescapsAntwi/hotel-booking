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

## License

MIT
