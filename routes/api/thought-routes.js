const { Thought } = require('../../models');

const router = require('express').Router();

//import controller methods for Thought model CRUD\
const {createThought, getAllThoughts, getThoughtById, deleteThought, createReaction, deleteReaction, updateThought} = require('../../controllers/thought-controller')


router.route('/')
      .get(getAllThoughts)


//create thought using a user's id
router
.route('/:userId')
.post(createThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
// reactions to thoughts 
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)


module.exports = router;