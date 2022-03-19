const express = require('express')

const router = express.Router()

// ---------------------- MIDDLEWARES ----------------------

const { admin } = require('../middlewares/admin')
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')
const { uploadBookFile } = require('../middlewares/uploadBook')


// ---------------------- AUTH ----------------------

const { register, login, authUser } = require('../controllers/auth')

router.post("/register", register);
router.post("/login", login);
router.get("/authuser", auth, authUser);

// ---------------------- USER ----------------------

const { getUsers, getUser, updateProfile, deleteUser } = require('../controllers/user')

router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', uploadFile('avatar') , updateProfile)
router.delete('/user/:id', deleteUser)


// ---------------------- BOOK ----------------------

const { addBook, deleteBook, getBooks, getBook, updateBook } = require('../controllers/book')

router.post('/book', uploadFile('cover', 'bookFile') , addBook)
router.delete('/book/:id', deleteBook)
router.get('/book/:id', getBook)
router.get('/books', getBooks)
router.patch('/book/:id', uploadFile('cover', 'bookFile'), updateBook)

// ---------------------- BOOK LIST ----------------------

const { addList, myList } = require('../controllers/bookList')

router.post('/bookList', auth, addList)
router.get('/myList', auth, myList)

// ---------------------- TRANSACTION ----------------------

const { addSubs, getTransactions, updateTransaction, check } = require('../controllers/transaction')

router.post('/subscribe', auth, uploadFile('transferProof'), addSubs)
router.get('/subscribes', admin, getTransactions)
router.patch('/transaction/:id', updateTransaction)






module.exports = router