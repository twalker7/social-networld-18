const {User, Thought} = require('../models');

const thoughtController = {
//partial crud, just create and delete -- no ability to update and read is not needed, thoughts shown


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
}



//addReaction

//deleteThought()
//deleteReaction()


};


module.exports = thoughtController;