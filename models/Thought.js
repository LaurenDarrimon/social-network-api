const { deepEqual } = require('assert');
const mongoose = require('mongoose');
const User = require('./User');


// structure of thought subdocument
const reactionSchema = new mongoose.Schema({
    reactionId: mongoose.ObjectId, 
    reactionBody: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { 
        type: String, 
        required: true,
        //type: mongoose.Schema.User.ObjectId,  
     },
});
  
// thoughtSchema is strcuture of the parent document
const thoughtSchema = new mongoose.Schema({

thoughtText: { type: String, required: true },
createdAt: { type: Date, default: Date.now },
username: { type: String, required: true },
reactions: [reactionSchema],
// This will include an array that holds all the reactions

});
  
// Uses mongoose's .model() method to create the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Uses model to create new instance of reaction subdocument
const reactionData = [
    { reactionBody: 'Me too!', username: "Aragorn" },
    { reactionBody: 'That is deep, my friend.', username: "Frodo" },
    { reactionBody: 'But will there be biscuits?', username: "Bilbo" },
];


const Thought = mongoose.model("User", thoughtSchema);

const handleError = (err) => console.error(err);
  
// if the collection isn't empty, insert many thoughts
Thought.find({}).exec((err, collection) => {

    if (collection.length === 0) {
        Thought.insertMany(
        [
            {
            thoughtText: "My firends, you bow to no one.",
            username: "Aragorn",
            reactions: reactionData,
            },
            {
            thoughtText: "I'm glad you're with me, @Sam.",
            username: "Frodo",
            reactions: reactionData,
            },
            {
            thoughtText: "No admitance except on party business.",
            uername: "Bilbo",
            reactions: reactionData,
            },
        ],
        (insertErr) => {
            if (insertErr) {
            handleError(insertErr);
            }
        }
        );
    }
});







module.exports = Thought;