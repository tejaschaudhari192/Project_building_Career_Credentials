const express = require('express');
const jwt = require('jsonwebtoken');
const myDB = require('../db-ops/dbHandler');
const verifyToken = require('../middleware/auth-middle-ware');
const router = express.Router();


router.get('/', verifyToken, (req, res) => {
    myDB.getTodos(req, res)
});


router.post('/', verifyToken, (req, res) => {
    myDB.addTodo(req, res);
});

router.put('/:id', verifyToken, (req, res) => {
    myDB.updateTodo(req,res);
})

router.delete('/:id', (req, res) => {
    
    myDB.deleteTodo(req, res);

});

module.exports = router, verifyToken;
