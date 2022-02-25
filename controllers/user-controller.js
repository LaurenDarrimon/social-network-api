// Require models
const { User, Thought } = require("../models");

//aggregate function for a user's friend count
const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
  //GET all users, no filter
  getUsers(req, res) {
    // User model to find all documents that are instances of that model
    User.find({}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  // POST route to create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //GET a single user by _id and populated with thought and friend data
  getOneUser(req, res) {
    User.findOne({ id_: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("Sorry, unable to find user");
        res.status(500).json({ message: "Sorry, unable to find user" });
      }
    });
  },

  // DELETE a User -- api/users/:userId/
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //PUT update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Sorry, no user was found with that id" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

   // POST to add new friend to User
  // :userId/friends/
  addFriend(req, res) {
    console.log("You made a new friend!");
    console.log(req.body); //friend data
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "We love imaginary friends. No user was found with that id",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  // DELETE a User's friend, sad.
  // :userId/friends/:friendId
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

 
};
