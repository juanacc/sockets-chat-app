const {Router} = require('express');
const {login, googleSignIn, renewToken} = require('../controllers/auth');
const {
    validateUserLogin,
    validateIdTokenGoogle,
    existUser,
    isValidPassword,
    isActiveUser,
    isAuthenticate,
    userExistInDB
} = require('../middlewares');

const router = Router();

router.post('/login', [validateUserLogin, existUser, isActiveUser, isValidPassword], login);
router.post('/google', [validateIdTokenGoogle], googleSignIn);
router.get('/', [isAuthenticate, userExistInDB, isActiveUser], renewToken);

module.exports = router;