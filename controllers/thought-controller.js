// Require models
const { User, Thought } = require("../models");

module.exports = {
  //GET all thoughts, no filter
  getThoughts(req, res) {
    // Thought model to find all documents that are instances of that model
    Thought.find({}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  // POST route to create a new thought associated with a user
  //NEW thought, simple
  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then(({ _id }) =>
        !_id
          ? res.status(404).json({ message: "Thought could not be created" })
          : User.findOneAndUpdate(
              { _id: req.body.userId },
              {
                $push: {
                  thoughts: _id,
                },
              },
              { new: true }
            )
      )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //GET a single Thought by _id
  getOneThought(req, res) {
    Thought.findOne({ id_: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Sorry, that thought has slipped our mind!");
        res.status(500).json({ message: "Unable to find thought id" });
      }
    });
  },

  // DELETE a thought -- api/thoughts/:thoughtId

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted.",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //PUT update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Sorry, no thought was found with that id" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //   /api/thoughts/:thoughtId/reactions

  // POST to create a reaction pushed into in a single thought's reactions array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { new: true, runValidators: true }
    )
      .then((thought) =>
        thought
          ? res.json(thought)
          : res
              .status(404)
              .json({ message: "Sorry, no thought was found with that id" })
      )
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
      .then((reaction) =>
        reaction
          ? res.json({ message: "Reaction deleted." })
          : res
              .status(404)
              .json({ message: "Sorry, no reaction was found with that id" })
      )
      .catch((err) => res.status(404).json(err));
  },
};
