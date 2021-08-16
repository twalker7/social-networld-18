const router = require('express').Router();

//import controller methods for User model CRUD

const {getUserById, getAllUsers, createUser, deleteUser, updateUser} = require('../../controllers/user-controller');


router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
module.exports = router;