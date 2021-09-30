const {User}  = require('../models');


const userController = {
// methods to facilitate CRUD

 // get all users
 getAllUsers(req, res) {
    User.find({})
  .populate({
    path: 'thoughts',
    select: '-__v'
  })
  .select('-__v')
  .sort({_id: -1})
  .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

   // get one user by id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza
  createUser: ({ body }, res) =>{
    console.log(body)
    User.create(body)
    .then(userData => res.json(userData))
     .catch(err => res.status(400).json(err.message));
},

 // update pizza by id
 updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(userData => {
        if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(userData);
    })
    .catch(err => res.status(400).json(err));
},

 // delete user by id
 deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(userData => {
        if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(userData);
    })
    .catch(err => res.status(400).json(err));
},



//add and delete friend 

addFriend({ params }, res) {
  User.findByIdAndUpdate(
    { _id: params.id },
    { $addToSet: { friends: params.friendId } },
    { new: true }
  )
    .select("-__v")
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
 },

 deleteFriend({ params }, res) {
  User.findByIdAndUpdate(
    { _id: params.id },
    { $pull: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .select("-__v")
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No friend found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
}


}


module.exports = userController;