const { Thought } = require('../../models');

const router = require('express').Router();

//import controller methods for Thought model CRUD\
const {createThought} = require('../../controllers/thought-controller')

router.route("/:userId")
      .post(createThought)

module.exports = router;