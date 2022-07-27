const {Router} = require('express');
const {
    isAuthenticate,
    validateUserCreation,
    validateUserUpdate,
    validateUserDelete,
    isActiveUser,
    userExistInDB,
    hasARole
} = require('../middlewares');
const {getUsers, putUsers, postUsers, deleteUser, patchUsers} = require('../controllers/users');
const router = Router();

router.get('/', getUsers);

router.put('/:id', validateUserUpdate, putUsers);

router.post('/', validateUserCreation, postUsers);

router.delete('/:id', [isAuthenticate, userExistInDB, hasARole('ADMIN_ROLE','ROOT_ROLE'), isActiveUser, validateUserDelete], deleteUser);

router.patch('/', patchUsers);

module.exports = router;
