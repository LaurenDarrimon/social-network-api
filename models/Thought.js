const { deepEqual } = require("assert");
const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const User = require("./User");

// structure of thought subdocument
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: { type: String, required: true, maxLength : 300 },
    createdAt: { type: Date, default: Date.now },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// thoughtSchema is strcuture of the parent document
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxLength : 300 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String }, //required: true
    userId: { type: String },
    reactions: [reactionSchema],
    // This will include an array that holds all the reactions
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Uses mongoose's .model() method to create the Thought model
const Thought = model("thought", thoughtSchema);

// Uses model to create new instance of reaction subdocument
const reactionData = [
  { reactionBody: "Me too!", username: "Aragorn" },
  { reactionBody: "That is deep, my friend.", username: "Frodo" },
  { reactionBody: "But will there be biscuits?", username: "Bilbo" },
];

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
