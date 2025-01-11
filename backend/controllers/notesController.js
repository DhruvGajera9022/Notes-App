const Note = require("../models/note_model");


// Add Note
const addNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const { user } = req.user;

        if (!title) {
            return res.status(400).json({ error: true, message: "Title is required" });
        }

        if (!content) {
            return res.status(400).json({ error: true, message: "Content is required" });
        }

        try {
            const note = new Note({
                title,
                content,
                tags: tags || [],
                userId: user._id,
            });

            await note.save();

            return res.json({
                error: false,
                note,
                message: "Note added successfully",
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Add Note API.",
        })
    }
}


// Edit Note
const editNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { title, content, tags, isPinned } = req.body;
        const { user } = req.user;

        if (!title && !content && !tags) {
            return res.status(400).json({ error: true, message: "No changes provided" });
        }

        try {
            const note = await Note.findOne({ _id: noteId, userId: user._id });

            if (!note) {
                return res.status(400).json({ error: true, message: "Note not found" });
            }

            if (title) note.title = title;
            if (content) note.content = content;
            if (tags) note.tags = tags;
            if (isPinned) note.isPinned = isPinned;

            await note.save();

            return res.json({
                error: false,
                note,
                message: "Note updated successfully",
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Add Note API.",
        })
    }
}


// Delete Note
const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { user } = req.user;

        try {
            const note = await Note.findOne({ _id: noteId, userId: user._id });

            if (!note) {
                return res.status(400).json({ error: true, message: "Note not found" });
            }

            await Note.deleteOne({ _id: noteId, userId: user._id });

            return res.json({
                error: false,
                message: "Note deleted successfully",
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Add Note API.",
        })
    }
}


// Get All Notes
const getNotes = async (req, res) => {
    try {
        const { user } = req.user;

        try {
            const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

            return res.json({
                error: false,
                notes,
                message: "All notes retrieved successfully",
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Add Note API.",
        })
    }
}


// Update isPinned Value
const pinnedNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { isPinned } = req.body;
        const { user } = req.user;

        try {
            const note = await Note.findOne({ _id: noteId, userId: user._id });

            if (!note) {
                return res.status(400).json({ error: true, message: "Note not found" });
            }

            note.isPinned = isPinned;

            await note.save();

            return res.json({
                error: false,
                note,
                message: "Note updated successfully",
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Update isPinned Note API.",
        })
    }
}


// Search notes
const searchNote = async (req, res) => {
    try {
        const { user } = req.user;
        const { query } = req.query;

        if (!query) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: "Search query is required"
                });
        }

        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ]
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Search Note API.",
        })
    }
}


module.exports = {
    addNote,
    editNote,
    deleteNote,
    getNotes,
    pinnedNote,
    searchNote,
}