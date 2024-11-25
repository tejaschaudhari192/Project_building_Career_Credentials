const express = require('express');
const app = express()
const PORT = 5000;

const cors = require('cors')
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const todosRoutes = require('./routes/todo');


app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
)

var corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use('/auth', authRoutes);
app.use('/todos', todosRoutes);



app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})