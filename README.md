# Premium Car Rental Platform 🚗✨

A modern, full-stack car rental platform built with the MERN stack (MongoDB, Express, React, Node.js). Designed to provide a seamless, premium booking experience for users, and a robust management dashboard for car owners.

## 🌟 Key Features

### For Renters
* **Beautiful UI:** A premium, fully-responsive interface with micro-animations and a sleek dark-themed Hero section.
* **Flexible Pricing Models:** Cars can be priced **Per Day** (calculated upfront) or **Per Liter** (billed on consumption after the trip).
* **Smart Search:** Search available cars by pickup location and date range.
* **Review System:** Leave a 1-5 star rating and review after your rental period ends.
* **Booking Management:** Track all past and current bookings easily from your personalized dashboard.

### For Owners
* **Owner Dashboard:** A dedicated portal to manage your fleet, track revenue, and handle booking requests.
* **Flexible Listings:** Add cars with custom specifications, dynamic pricing options, and image uploads.
* **Booking Approval:** Owners can accept or cancel pending booking requests dynamically.
* **Dynamic Profiles:** Personalize your owner profile with image uploads.

## 🛠️ Technology Stack
* **Frontend:** React, Tailwind CSS, Vite, Axios, React Router Dom
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Image Hosting:** ImageKit / Cloudinary integration via Multer

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd carRental
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create a .env file based on environment variables needed
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to see the app in action!

## 📸 Platform Highlights
- **Responsive Hero Section:** Fully responsive carousel background with sleek dark overlays.
- **Consumption Based Billing:** First-class support for Indian rental standards (fuel-based vs time-based pricing).
- **Profile Avatars:** Fallback gradients with name initials for users without uploaded profile pictures.

## 📄 License
This project is licensed under the MIT License.
