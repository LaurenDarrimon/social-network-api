const router = require("express").Router();
// Require models
const { Reaction, User, Thought } = require('./models');

// ------ api/users ------

//GET all users


//GET a single user by _id and populated thought and friend data


//POST a new user


//PUT to update a user by _id


//DELETE to remove user by  _id




//  -------  api/users/:userId/friends/:friendId ------ 

//POST to add a new friend to a user's friend list

//DELETE to remove a friend from a user's friend list


module.exports = router;