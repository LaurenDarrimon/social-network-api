const router = require("express").Router();

const {
  getThoughts,
  createThought,
  getOneThought,
  deleteThought,
  updateThought,
  //addReaction,
  //removeReaction
} = require('../../controllers/thought-controller.js');



// ----- /api/thoughts --------- 
//GET all thoughts & POST a new thought
router.route('/').get(getThoughts).post(createThought);


//Thought GET by _id & PUT to update a thought by _id & DELETE to remove thought by  _id
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);


// ---- /api/thoughts/:thoughtId/reactions -----

// POST to create a reaction stored in a single thought's reactions array field
//router.route('/:thoughtId/reactions').post(addReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
//router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);


module.exports = router;
