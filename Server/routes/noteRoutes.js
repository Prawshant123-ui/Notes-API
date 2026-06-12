const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");

const {
  createNotes,
  getNotes,
  getNotesById,
  getNotesByCategory,
  updateNotes,
  deleteNotes,
  searchNotes,
} = require("../controllers/noteController");

router.post("/notes", protect, createNotes);

router.get("/notes", protect, getNotes);

router.get("/notes/search", protect, searchNotes);

router.get("/notes/category/:category", protect, getNotesByCategory);

router.get("/notes/:id", protect, getNotesById);

router.put("/notes/:id", protect, updateNotes);

router.delete("/notes/:id", protect, deleteNotes);

module.exports = router;