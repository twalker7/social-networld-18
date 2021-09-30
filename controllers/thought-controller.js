const {User, Thought} = require('../models');

const thoughtController = {
//partial crud, just create and delete -- no ability to update and read is not needed, thoughts shown

 addThought:({body, params},res)=>{
      Thought.create(body).then((thoughtData)=>{ 
          return User.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: thoughtData._id}})
      })
      .then(userData=>res.json(userData));
 }


//addReaction

//deleteThought()
//deleteReaction()


};


module.exports = thoughtController;