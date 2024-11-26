const db = require('mysql');
const md5 = require('md5');
const jwt = require('jsonwebtoken')

const SECRET = 'ITS SECRET';

const myDB = db.createConnection({
    host: "bbpg7azfylbddolh8i3v-mysql.services.clever-cloud.com",
    user: "uglr56rn1tuczhqy",
    password: "PNpCw03xCunCCyGc2kVG",
    database: "bbpg7azfylbddolh8i3v",
    port: 3306
});

myDB.connect((err) => {
    if (err)
        console.log(err);
    else
        console.log("Connected Successfully");

})

// const myDB = db.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "bhoju",
//     database: "todo_app",
//     debug: false
// });


function registerUser(req, res) {

    const { username, email, password } = req.body;
    const hashedPassword = md5(password);
    myDB.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
            if (err) return res.status(500).send({ message: err.message });
            res.status(201).send({ message: 'User registered successfully!' });
        }
    );
}

function loginUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = md5(password);
    console.log('logging');
    

    myDB.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
            if (err) return res.status(500).send({ message: err.message });
            if (results.length === 0)
                return res.status(404).send({ message: 'no user' });

            const user = results[0];
            const isValid = hashedPassword == user.password;

            if (!isValid)
                return res.status(401).send({ message: 'Invalid creds' });

            const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Logged', token });
        }
    );
}

function getTodos(req, res) {


    myDB.query('SELECT * FROM todos WHERE user_id = ?', [req.userId], (err, results) => {
        if (err) return res.status(500).send({ message: err.message });
        res.status(200).send(results);
    });
}

function addTodo(req, res) {
    const { task } = req.body;
    myDB.query('INSERT INTO todos (user_id, task) VALUES (?, ?)', [req.userId, task], (err) => {
        if (err) return res.status(500).send({ message: err.message });
        res.status(201).send({ message: 'Todo added successfully!' });
    });
}

function deleteTodo(req, res) {
    const { id } = req.params;
    myDB.query('DELETE FROM todos WHERE id = ? ', [id], (err, results) => {
        if (err) return res.status(500).send({ message: err.message });
        console.log(results);
        res.status(200).send(results);
    });
}

function updateTodo(req, res) {
    const { id } = req.params;
    const { completed } = req.body;
    myDB.query(
        'UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?',
        [completed, id, req.userId],
        (err) => {
            if (err) return res.status(500).send({ message: err.message });
            res.status(200).send({ message: 'Todo updated successfully!' });
        }
    );
}

function updateUserDetails(req, res) {
    const { fname, lname, phone, branch, degree, year } = req.body;

    myDB.query(
        `UPDATE users SET fname = ?,lname = ? ,phone = ?, branch = ?, degree = ?, year = ? WHERE id = ?`,
        [fname, lname, phone, branch, degree, year, req.userId],
        (err) => {
            if (err) {

                return res.status(500).send({ message: err.message });
            }

            res.status(200).send({ message: 'User details updated successfully!' });
        }
    );
}
function updateUserPassword(req, res) {
    const { username, currentPassword, newPassword } = req.body;
    ('updating pass');

    myDB.query(
        `SELECT password FROM users WHERE username = ?`,
        [username],
        (err, results) => {
            if (err) return res.status(500).send({ message: err.message });

            const user = results[0];
            if (md5(currentPassword) != user.password) {

                // console.log(md5(currentPassword) , user.password);

                return res.status(401).send({ message: 'Current password is incorrect!' });
            }

            const hashedPassword = md5(newPassword);
            myDB.query(
                `UPDATE users SET password = ? WHERE username = ?`,
                [hashedPassword, username],
                (updateErr) => {
                    if (updateErr) return res.status(500).send({ message: updateErr.message });
                    res.status(200).send({ message: 'Password updated successfully!' });
                }
            );
        }
    );
}

function getDetails(req, res) {

    myDB.query(
        `SELECT fname,lname,email,phone, branch, degree, year FROM users WHERE id = ?`,
        [req.userId],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: err.message });
            } if (results.length === 0) {
                return res.status(404).send({ message: 'User not found!' });
            }
            res.status(200).send(results[0]);
        }
    );
}

module.exports = {
    myDB,
    registerUser,
    loginUser,
    getTodos,
    addTodo,
    deleteTodo,
    updateUserDetails,
    updateUserPassword,
    getDetails,
    updateTodo
}