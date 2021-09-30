const {User, Thought} = require('../models');

const thoughtController = {
//partial crud, just create and delete -- no ability to update and read is not needed, thoughts shown

// add new thought to user 
 createThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "Cannot find user with this id."});
            return;
        } res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},
//get a single thought 
getThoughtById({ params }, res) {
    console.log("params sent", params)
    Thought.findOne({ _id: params.thoughtId })
  .select("-__v")
  .then((dbThoughtData) => {
    if (!dbThoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
},

//get all thoughts 
getAllThoughts(req, res) {
    Thought.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
},

deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedthought => {
            if (!deletedthought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this id!'});
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
},

//create a reaction
createReaction({ params, body }, res) {
    console.log( body)
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true }
    )
        .then(thoughtData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thoughts found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
},
// remove a reaction
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
}



};


module.exports = thoughtController;