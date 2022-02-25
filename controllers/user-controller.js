// Require models
const { Reaction, User, Thought } = require('../models');

module.exports= {
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
    //GET a single user by _id and populated with thought and friend data
    getOneUser(req, res) {
        User.findOne({ id_: req.params.id }, (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
          }
        });
    }, 



}