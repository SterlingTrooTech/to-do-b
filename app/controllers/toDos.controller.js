const db = require("../models");
const ToDos = db.toDos;

exports.create = (req, res) => {
  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const todo = new ToDos({
    userName: req.body.userName,
    gender: req.body.gender,
    hobbies: req.body.hobbies,
    age: req.body.age,
    date: req.body.date,
    taskName: req.body.taskName,
    status: req.body.status
  });

  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
};

exports.findAll = (req, res) => {
  const userName = req.query.userName;
  var condition = userName ? { userName: { $regex: new RegExp(userName), $options: "i" } } : {};

  ToDos.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving To-Do's."
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  ToDos.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update To-do with id=${id}. Maybe To-Do was not found!`
        });
      } else res.send({ message: "To-Do was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating To-Do with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ToDos.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete To-Dd with id=${id}. Maybe To-Do was not found!`
        });
      } else {
        res.send({
          message: "To-Do was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete To-Do with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  ToDos.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} To-Do's were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all To-Do's."
      });
    });
};