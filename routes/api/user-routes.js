const router = require("express").Router();
// Require models
const { Reaction, User, Thought } = require('../../models');

// ------ api/users ------

//GET all users

router.get('/', (req, res) => {
    // User model in the route to find all documents that are instances of that model
    User.find({}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });


//GET a single user by _id and populated with thought and friend data
router.get('/:id', (req, res) => {
    User.findOne({ id_: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  });


//POST a new user


//PUT to update a user by _id


//DELETE to remove user by  _id




//  -------  api/users/:userId/friends/:friendId ------ 

//POST to add a new friend to a user's friend list

//DELETE to remove a friend from a user's friend list


module.exports = router;