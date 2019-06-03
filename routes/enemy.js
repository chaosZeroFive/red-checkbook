const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Enemy = require("../models/Enemy");

// @route     GET api/enemy
// @desc      Get all enemy
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const enemy = await Enemy.find({ user: req.user.id }).sort({ date: -1 });
    res.json(enemy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/enemy
// @desc      Add New Enemy
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    try {
      const newEnemy = new Enemy({
        name,
        user: req.user.id
      });

      const enemy = await newEnemy.save();

      res.json(enemy);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     DELETE api/enemy/:id
// @desc      Delete Enemy
// @access    Private

router.delete("/:id", auth, async (req, res) => {
  let enemy = await Enemy.findById(req.params.id);

  if (!enemy) return res.status(404).json({ msg: "Enemy not found" });

  // Check if User owns the Item
  if (enemy.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  await Enemy.findByIdAndRemove(req.params.id);

  res.json({ msg: "Enemy Removed" });
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
