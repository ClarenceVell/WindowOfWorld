const express = require('express')

const router = express.Router()

// ---------------------- MIDDLEWARES ----------------------

const { admin } = require('../middlewares/admin')
const { auth } = require('../middlewares/auth')

// ---------------------- AUTH ----------------------

const { register, login, authUser } = require('../controllers/auth')

router.post("/register", register);
router.post("/login", login);
router.get("/authuser", auth, authUser);


module.exports = router