const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchUser");
const { query, validationResult } = require("express-validator");

//ROUTE-1 : Get all notes using GET: '/api/notes/fetchalluser' ------------------------------------------------------>>
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE-2 : Add a new note using POST: '/api/notes/addnote' ------------------------------------------------------>>
router.post(
  "/addnote",
  fetchuser,
  [
    query("title", "Enter a valid title").isLength({ min: 3 }),
    query("description", " Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //destructuring
      const { title, description, tag } = req.body;
      //if there are ERRORS , return bad request and the errors
      const result = validationResult(req);
      if (result.isEmpty()) {
        return res.status(400).json({ error: toHaveErrorMessage.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.status(201).json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-3 : Update an Existing note using PUT: '/api/notes/updatenote' : login required ------------------------------------------------------>>
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
  //create a new object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.status(200).json({ note });
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error");
}
});

//ROUTE-4 : Delete an Existing note using DELETE: '/api/notes/deletenote' : Login required  ------------------------------------------------------>>
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // const {title, description, tag} = req.body;
  try {

  //Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //Allow delete if only user owns the note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(
    req.params.id,
  );

  res.status(200).json({ "success": "Note has been deleted" });
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error");
}

});

module.exports = router;
