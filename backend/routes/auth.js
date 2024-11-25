const express = require('express');
var router = express.Router();
const myDB = require('../db-ops/dbHandler');
// const verifyToken = require('./todo')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth-middle-ware');




router.post('/register', (req, res) => {

    myDB.registerUser(req, res);
});

router.post('/login', (req, res) => {
    myDB.loginUser(req, res)
});

router.put('/update', verifyToken, (req, res) => {
    myDB.updateUserDetails(req, res)
});

router.put('/password', (req, res) => {
    myDB.updateUserPassword(req, res)
});

router.get('/me', verifyToken, (req, res) => {
    myDB.getDetails(req, res);
});



module.exports = router;