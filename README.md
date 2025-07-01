# Job Tracker App

A full-stack Job Tracking application built with the **MERN Stack** that helps users manage and monitor their job application journey. Users can add, update, delete, and analyze their job entries with insightful statistics — all securely and with a smooth user experience.

---

## Live Demo

**[View Live Application]()**

> _Deployed on Render's free tier — the app may take 60–90 seconds to load when idle._

---

## Features

- **Secure Authentication** (Register / Login / Logout)
- **Protected Routes** (for authenticated users only)
- **Add / Edit / Delete Job Applications**
- **Job Attributes:** title, company, type, status, salary, recruiter details, interview date/time
- **Search + Filtering:** by job type, status, title, and sort options
- **Statistics Dashboard:**
  - Monthly application count
  - Status breakdown (declined, pending, interview)
- **Pagination Support**
- **User Profile Management**
- **Responsive UI** (Mobile-friendly)

---

## Project Objectives

This project was built with the intention to:

- Strengthen practical understanding of full-stack development
- Master the MERN stack (MongoDB, Express.js, React, Node.js)
- Implement secure user authentication using JWT & cookies
- Practice best practices in RESTful API development
- Work with real-world features like charts, pagination, and profile management
- Deploy and manage a live MERN application using Render

---

## Tech Stack

### **Frontend**

- React.js (Hooks + Context API)
- React Router DOM
- Styled Components
- Axios (API communication)

### **Backend**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt.js (Password hashing)
- dotenv (Environment config)

### **Security Middleware**

- helmet
- xss-clean
- express-mongo-sanitize
- cookie-parser

---

## 📂 Folder Structure

mern-job-tracker/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.js
│
├── controllers/ # Express route logic
├── middleware/ # Custom middleware
├── models/ # Mongoose models
├── routes/ # Express routes
├── utils/ # Helper functions
├── server.js # App entry point
└── .env # Environment variables

---

## Future Enhancements

- Email notifications for scheduled interviews
- Resume upload support
- Dark/light theme switcher
- Admin dashboard panel
- Integration with job portals (Indeed, LinkedIn)

---

## Author

Sourav Kumar Bhagat
Entry-Level Full Stack Developer | MERN Stack Enthusiast
🔗 LinkedIn | 💻 GitHub

---

Thank you for checking out the project! ⭐
Feel free to open issues or contribute ideas for improvements.
