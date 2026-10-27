# 🎬 CineBook — Movie Ticket Booking System

A modern, responsive, multi-page cinema ticket booking web application built with **React**, **Vite**, **React Router v7**, **Redux Toolkit**, and **Context API**.

Designed and upgraded for **College Milestone Evaluation 2**.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [Evaluation 2 Rubric Implementation Mapping](#-evaluation-2-rubric-implementation-mapping)
4. [Context API vs. Redux Toolkit Architecture](#-context-api-vs-redux-toolkit-architecture)
5. [Interactive Cinema Features](#-interactive-cinema-features)
6. [Project Structure](#-project-structure)
7. [Getting Started & Local Setup](#-getting-started--local-setup)
8. [Evaluator Viva & Demonstration Guide](#-evaluator-viva--demonstration-guide)
9. [Verification & Test Results](#-verification--test-results)

---

## 🌟 Project Overview

**CineBook** provides movie lovers with an end-to-end digital cinema experience:
- **Discover**: Browse movies, filter by genre, search keywords, and sort by ratings or titles.
- **Inspect**: View rich film details including director, cast, synopsis, runtime, and daily showtimes.
- **Select Seats**: Visual cinema layout with standard and VIP tiers, real-time total calculations, and booked seat locks.
- **Book with Validation**: Controlled form inputs with robust validation preventing past dates and invalid phone/emails.
- **Manage**: View confirmed e-tickets, cancel bookings with confirmation, and dynamically release seats back to the cinema pool.
- **Watchlist**: Save and toggle favourite movies instantly across sessions via Redux and `localStorage`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 (Functional Components, Custom Hooks)
- **Bundler & Tooling**: Vite 8, Oxlint
- **Routing**: `react-router-dom` v7 (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useParams`, `useNavigate`)
- **Global State**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`, `configureStore`, `createSlice`, `useSelector`, `useDispatch`)
- **Session Context**: React Context API (`createContext`, `useContext`, custom hooks `useBooking()`, `useAuth()`)
- **Persistence**: Safe `localStorage` synchronization with graceful fallback handling
- **Styling**: Modular CSS adhering to the CineBook dark cinematic design system

---

## 📊 Evaluation 2 Rubric Implementation Mapping

| Rubric Topic | Key Requirements | Implementation Files |
| :--- | :--- | :--- |
| **A. React Navigation & Layout** | Multi-page routing, layout wrappers, dynamic route params, active links, 404 page | `src/App.jsx`<br>`src/components/Navbar.jsx`<br>`src/components/Footer.jsx`<br>`src/pages/MovieDetails.jsx`<br>`src/pages/NotFound.jsx` |
| **B. Context API Architecture** | Ephemeral booking session state, show date/time, customer draft, custom hook | `src/context/BookingContext.js`<br>`src/context/BookingProvider.jsx`<br>`src/hooks/useBooking.js` |
| **C. Redux Toolkit** | Persistent global state, Immer reducers, favourites slice, bookings slice, selectors | `src/store/store.js`<br>`src/store/bookingSlice.js`<br>`src/store/favouritesSlice.js` |
| **D. Form Handling & Seating** | Controlled inputs, inline validation, cinema seat map, price breakdown, cancellation & seat release | `src/components/SeatSelector.jsx`<br>`src/components/BookingForm.jsx`<br>`src/pages/Booking.jsx`<br>`src/pages/MyBookings.jsx` |

---

## ⚖️ Context API vs. Redux Toolkit Architecture

A core requirement for Evaluation 2 is keeping the responsibilities of Context API and Redux Toolkit distinct, clean, and explainable:

```
┌────────────────────────────────────────────────────────┐
│                   CINEBOOK STATE                       │
├───────────────────────────┬────────────────────────────┤
│     React Context API     │       Redux Toolkit        │
│  (Session / Wizard State) │  (Persistent Application)  │
├───────────────────────────┼────────────────────────────┤
│ • In-flight booking draft │ • Confirmed bookings array │
│ • Selected show date/time │ • Cancellation registry    │
│ • Real-time seat clicks   │ • Global seat occupancy    │
│ • Form input keystrokes   │ • Favourite movie IDs      │
│ • Wizard step navigation  │ • LocalStorage persistence │
└───────────────────────────┴────────────────────────────┘
```

### Why Context API for Booking Session?
- **Ephemeral Lifecycle**: The active seat clicks, draft inputs, and wizard steps only matter while the user is actively on the booking page.
- **Reduces Redux Overhead**: We avoid dispatching high-frequency actions to the global Redux store on every seat click or text keystroke.
- **Custom Hook Access**: Accessed cleanly via `useBooking()`.

### Why Redux Toolkit for Bookings & Favourites?
- **Application-Wide Scope**: Booking history and favourites must be accessible from the Navbar badges, Movie Cards, My Bookings, and Favourites pages.
- **Predictable Immer Mutations**: Actions like `addBooking`, `cancelBooking`, and `toggleFavourite` use Immer to produce clean immutable updates.
- **Derived Selectors**: `selectBookedSeatsForSlot(state, movieId, date, showtime)` computes occupied seats by aggregating all active confirmed bookings. When a booking is cancelled, its seats are automatically released!

---

## 💺 Interactive Cinema Features

1. **Curved Cinema Screen**: Visual cue indicating the orientation of the screen.
2. **Tiered Seating**:
   - Standard Rows (A-D) @ base ticket price (e.g., ₹250).
   - VIP / Premium Recliner Rows (E-F) with 35% premium (e.g., ₹350).
3. **Seat States**:
   - `Available`: Interactive dark slate tile.
   - `VIP`: Purple accent border.
   - `Selected`: High-visibility red glow.
   - `Booked / Unavailable`: Dimmed, struck-through, and unclickable.
4. **Dynamic Seat Release**:
   - When a user confirms a booking, the seats become booked for that slot.
   - When a user cancels their booking in **My Bookings**, those seats are immediately freed up and become selectable again.

---

## 📂 Project Structure

```
movie_g12/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                     # Redux Provider, AuthProvider, BookingProvider wrappers
│   ├── App.jsx                      # React Router routes & layout structure
│   ├── App.css
│   ├── index.css
│   ├── test-verify.js               # Evaluation 2 verification test suite
│   ├── assets/
│   ├── data/
│   │   └── movies.js                # Consolidated movie dataset (8 blockbusters)
│   ├── store/
│   │   ├── store.js                 # Redux Toolkit store configuration
│   │   ├── bookingSlice.js          # Bookings history, cancellation & seat reservation logic
│   │   └── favouritesSlice.js       # Watchlist movie IDs with localStorage sync
│   ├── context/
│   │   ├── BookingContext.js        # Context definition for booking workflow
│   │   ├── BookingProvider.jsx      # Provider managing active session state
│   │   ├── AuthContext.js           # Client-side demo auth context
│   │   └── AuthProvider.jsx         # Auth session provider
│   ├── hooks/
│   │   ├── useBooking.js            # Custom hook for booking session context
│   │   └── useAuth.js               # Custom hook for demo user authentication
│   ├── components/
│   │   ├── Navbar.jsx / .css        # Responsive navigation with live Redux badges
│   │   ├── Footer.jsx / .css        # Global cinematic footer with Router links
│   │   ├── MovieCard.jsx / .css     # Movie card with heart toggle & navigation
│   │   ├── MovieGrid.jsx / .css     # Reusable responsive movie grid layout
│   │   ├── SeatSelector.jsx / .css  # Interactive cinema seat map & legend
│   │   └── BookingForm.jsx / .css   # Form validation & ticket confirmation
│   └── pages/
│       ├── Home.jsx / .css          # Hero, search, featured & popular sections
│       ├── Movies.jsx / .css        # Catalog, genre filters & sorting
│       ├── MovieDetails.jsx / .css  # Backdrop hero, synopsis, cast, booking CTA
│       ├── Booking.jsx / .css       # Two-column seat selection & booking page
│       ├── MyBookings.jsx / .css    # E-Tickets list, tabs & cancel with seat release
│       ├── Favourites.jsx / .css    # Persistent watchlist with Redux
│       ├── Login.jsx / .css         # Demo login with 1-click evaluator sign-in
│       ├── Signup.jsx / .css        # Account registration
│       ├── About.jsx / .css         # Mission & tech overview
│       ├── Contact.jsx / .css       # Support message form
│       └── NotFound.jsx / .css      # Custom cinematic 404 page
```

---

## 🚀 Getting Started & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run Lint Check
```bash
npm run lint
```

### 4. Run the Architectural Verification Test Suite
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## 🎯 Evaluator Viva & Demonstration Guide

Follow these steps during your evaluation demo:

### Step 1: React Navigation & Dynamic Routes (Rubric A)
1. Open the Home page (`/`). Notice the active link styling on "Home".
2. Click **Movies** in the Navbar (`/movies`). Test the search input, genre chips (Action, Sci-Fi), and sort dropdown.
3. Click on **Interstellar**. Notice the URL updates to `/movies/1`.
4. Explain how `useParams()` extracts the movie ID and retrieves metadata dynamically.
5. Manually type an invalid route like `/movies/999` or `/random-url` to demonstrate the **Custom 404 Not Found** page.

### Step 2: Redux Toolkit Favourites (Rubric C)
1. Point to the **Favourites** link in the Navbar showing the current count badge.
2. Click the heart icon on any movie poster (e.g. *Dune: Part Two*).
3. The heart turns red immediately and the badge in the Navbar increments without page reload.
4. Click **Favourites** (`/favourites`) to see the updated list.
5. Refresh the page (F5). Show the evaluator that favourites persist from `localStorage`.

### Step 3: Interactive Seat Selection & Context API (Rubric B & D)
1. Click **Book Now** on any movie to navigate to `/booking/:id`.
2. Explain that `BookingProvider` supplies the active session state via `useBooking()`.
3. Pick a show date and showtime.
4. Click seats (e.g., standard seat `C4` and VIP seat `E5`).
5. Notice:
   - Live seat counter updates.
   - Price calculation breaks down standard vs. VIP (₹350) and includes convenience fee.
   - Booked / occupied seats cannot be selected.

### Step 4: Form Validation & Booking Confirmation (Rubric D)
1. Try submitting the form with empty fields. Show the friendly inline validation error messages.
2. Enter a full name, valid email address, and 10-digit phone number.
3. Submit the form.
4. A **Confirmed E-Ticket** appears with a unique booking reference (e.g. `CB-849201`).

### Step 5: My Bookings & Seat Release (Rubric C & D)
1. Navigate to **My Bookings** (`/my-bookings`).
2. Show the newly created e-ticket with status `CONFIRMED`.
3. Click **Cancel Booking**. Confirm the prompt.
4. The ticket updates to `CANCELLED` and its badge turns red.
5. Go back to the booking page for that same movie and showtime.
6. Point out that the seats previously booked have now been **dynamically released** and are available again!

---

## 🧪 Verification & Test Results

The codebase includes an automated verification script (`src/test-verify.js` run via `npm test`) which confirms:
- ✅ All 8 movies contain required metadata.
- ✅ Redux Toolkit store properly combines `bookings` and `favourites` slices.
- ✅ Favourites toggle action performs immutable state updates.
- ✅ Confirmed booking reserves seats in the slot registry.
- ✅ Booking cancellation updates status and releases seats back to available.
- ✅ Form validation regex patterns correctly validate emails and 10-digit phone numbers.
- ✅ Oxlint completes with **0 errors and 0 warnings**.
- ✅ Vite production build builds successfully.
# Cinebook2
# Cinebook2
# Cinebook2
