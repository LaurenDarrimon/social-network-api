const router = require("express").Router();
// Require models
const { Reaction, User, Thought } = require('../../models');

// ------ api/users ------


//GET all users & POST a new user

router.route('/').get(getUsers).post(createUser);


//User by id GET by _id & PUT to update a user by _id & DELETE to remove user by  _id
router.route('/:userId').get(getOneUser).delete(deleteUser);


//  -------  api/users/:userId/friends/:friendId ------ 

//POST to add a new friend to a user's friend list
router.route('/:userId/friends').post(addFriend);

//DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(removeFriend);



module.exports = router;