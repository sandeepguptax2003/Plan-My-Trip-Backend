const express = require("express");
const { travelModel } = require("../models/travel.model");

const travelRouter = express.Router();

travelRouter.get("/posts", async (req, res) => {
  const travel = await travelModel.find();
  res.send(travel);
});

travelRouter.post("/posts", (req, res) => {
  const { name, email, destination, travellers, budget } = req.body;

  const travel = new travelModel({
    name,
    email,
    destination,
    travellers,
    budget,
  });

  travel
    .save()
    .then(() => {
      res.status(201).json({ message: "Detination Saved Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to store data" });
    });
});

travelRouter.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  travelModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Detination Deleted Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete data" });
    });
});

travelRouter.get("/posts/filter", (req, res) => {
  const { destination } = req.query;

  travelModel
    .find({ destination })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to filter data" });
    });
});

travelRouter.get("/posts/sort", (req, res) => {
  travelModel
    .find()
    .sort({ budget: 1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to sort data" });
    });
});

module.exports = {
  travelRouter,
};
