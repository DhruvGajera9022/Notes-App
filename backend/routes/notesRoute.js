const express = require("express");
const route = express.Router();

const notesController = require("../controllers/notesController");
const { authenticateToken } = require("../utilities");


// Add Note
route.post("/add-note", authenticateToken, notesController.addNote);

// Edit Note
route.put("/edit-note/:noteId", authenticateToken, notesController.editNote);

// Delete note
route.delete("/delete-note/:noteId", authenticateToken, notesController.deleteNote);

// Get All Notes
route.get("/get-all-notes", authenticateToken, notesController.getNotes);

// Update isPinned Value
route.put("/update-note-pinned/:noteId", authenticateToken, notesController.pinnedNote);

// Search notes
route.get("/search-note", authenticateToken, notesController.searchNote);


module.exports = route;