const prisma=require("../config/prisma")

//Create Notes
const createNotes = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const note = await prisma.note.create({
      data: {
        title,
        category,
        content,
        userId: req.user.id,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all notes along with pagination
const getNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalNotes = await prisma.note.count({
      where: {
        userId: req.user.id,
      },
    });

    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalNotes / limit),
      totalNotes,
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get single note
const getNotesById = async (req, res) => {
  try {
    const notes = await prisma.note.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });
    if (!notes) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Search notes
const searchNotes = async (req, res) => {
  try {
    const keyword = req.query.q;

    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id,
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    });
    res.status(201).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Get notes by category
const getNotesByCategory = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        category: req.params.category,
        userId: req.user.id,
      },
    });
    res.status(201).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Update notes
const updateNotes = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const notes = await prisma.note.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });
    if (!notes) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }

    const updatedNotes = await prisma.note.updateMany({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(content && { content }),
      },
    });
    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Delete notes
const deleteNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findUnique({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!notes) {
      return res.status(404).json({
        message: "Notes not found !!",
      });
    }
    await prisma.note.delete({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNotes,
  getNotes,
  getNotesById,
  getNotesByCategory,
  updateNotes,
  deleteNotes,
  searchNotes,
};
