const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Plan = require("../models/Plan");

// @route     GET api/plans
// @desc      Get all users plans
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/plans
// @desc      Add new plan
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type } = req.body;

    try {
      const newPlan = new Plan({
        name,
        type,
        user: req.user.id
      });

      const plan = await newPlan.save();

      res.json(plan);
    } catch (err) {
      console.error(er.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/plans/:id
// @desc      Update plan
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { name, type } = req.body;

  // Build plan object
  const planFields = {};
  if (name) planFields.name = name;
  if (type) planFields.type = type;

  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: planFields },
      { new: true }
    );

    res.json(plan);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/plans/:id
// @desc      Delete plan
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Plan.findByIdAndRemove(req.params.id);

    res.json({ msg: "Plan removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
