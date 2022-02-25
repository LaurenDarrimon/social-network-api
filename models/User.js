const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      validate: {
        validator: function (inputEmail) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(
            inputEmail
          );
        },
        message: "Please enter a valid email address",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [{
      type: Schema.Types.ObjectId, 
      ref: 'user'
    }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

const handleError = (err) => console.error(err);

// if the collection isn't empty, insert many Users
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        {
          username: "Aragorn",
          email: "king@gondor.gov",
        },
        {
          username: "Frodo",
          email: "baggins@shire.org",
        },
        {
          username: "Bilbo",
          email: "bilbo@shire.org",
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

module.exports = User;
