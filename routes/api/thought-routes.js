const { Thought } = require('../../models');

const router = require('express').Router();

//import controller methods for Thought model CRUD\
const {addThought} = require('../../controllers/thought-controller')

router.route("/:userId")
      .post(addThought)

module.exports = router;