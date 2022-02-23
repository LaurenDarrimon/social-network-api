const router = require("express").Router();
// Require models
const { Reaction, User, Thought } = require('../../models');


// ----- /api/thoughts --------- 

// GET to get all thoughts


// GET to get a single thought by _id


// POST to create a new thought
//push the created thought's _id to the associated user's thoughts array field


// PUT to update a thought by _id

// DELETE to remove a thought by _id




// ---- /api/thoughts/:thoughtId/reactions -----

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value





module.exports = router;