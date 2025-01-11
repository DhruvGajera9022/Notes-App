# Notes App (MERN Stack)

![Dashboard Screenshot](./frontend/src/assets/images/Dashboard.png)

This is a feature-rich notes application built using the MERN stack (MongoDB, Express.js, React.js with Vite, and Node.js). The app includes functionalities for user authentication, note management, and advanced features like pinning and searching notes.

## Features

### Frontend

- Built using **Vite** for fast development and **React.js** for UI.
- Styled with **Tailwind CSS** for a modern, responsive design.
- Pages:
  - **Login**: User authentication with JWT.
  - **Signup**: User registration.
  - **Dashboard**: Displays user’s notes with options to search, pin, edit, or delete notes.
  - **Add/Edit Note**: Allows users to create or modify notes.
- API communication using **Axios**.

### Backend

- Built with **Node.js** and **Express.js**.
- Database: **MongoDB** for storing user and notes data.
- RESTful APIs:
  - **Authentication**: Login, Register.
  - **Notes Management**: Add, Edit, Delete, Pin, Search Notes.
  - **Security**: JWT-based authentication and authorization.

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=8002
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8002`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173/`.

---

## API Endpoints

### Authentication

- **POST** `/create-account`: Register a new user.
- **POST** `/login`: Authenticate user and return JWT.
- **GET** `/get-user` : Get user data.

### Notes

- **POST** `/add-note`: Add a new note.
- **GET** `/get-all-notes`: Fetch all notes for a user.
- **PUT** `/edit-note/:noteId`: Edit an existing note.
- **DELETE** `/delete-note/:noteId`: Delete a note.
- **PUT** `/update-note-pinned/:noteId`: Pin/unpin a note.
- **GET** `/search-note`: Search notes by keyword.

---

## Future Improvements

- Implement rich-text editor for notes.
- Add sharing/collaboration features.
- Enable offline mode with service workers.

---

## Contact

For any questions or feedback, feel free to reach out at [dhruvgajera05@gmail.com].
