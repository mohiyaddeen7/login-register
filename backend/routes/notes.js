const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 : get all the notes : GET "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

//Route 2 : add note : POST "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "enter a valid description").exists(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);

      if (!result) {
        return res.status(400).json({ error: result.array() });
      }

      const note = new Notes({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (errs) {
      res.status(400).send({ error: "Bad response saving note" });
    }
  }
);

//Route 3 : update note : PUT "/api/notes/updatenote" login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const updateNoteParam_IdParam = req.params.id;
    let note = await Notes.findById(updateNoteParam_IdParam);

    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("Access Denied");
    }

    const updatedNote = {};
    const { title, description, tag } = req.body;

    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    if (tag) {
      updatedNote.tag = tag;
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: "failed updating note" });
  }
});

//Route 4 : Delete note : PUT "/api/notes/deletenote" login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const noteID = req.params.id;
    let note = await Notes.findById(noteID);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Found");
    }

    note = await Notes.findByIdAndDelete(noteID);
    res.send("success");
  }catch (error) {
    res.status(400).json({ error: "failed deleting note" });
  }
});

module.exports = router;
