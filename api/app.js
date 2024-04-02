const express = require('express');
const cors = require('cors');
require('dotenv').config()
const candidateRouter = require('./routes/candidate.js')
const userRouter = require('./routes/user.js')
const jobRouter = require('./routes/job.js')
const { MongoClient } = require("mongodb")
const bodyParser = require('body-parser')
const { verifyToken } = require('./utils/usersUtils.js')
const app = express();
const port = process.env.PORT;

// Mongodb config

const uri = process.env.URI
const client = new MongoClient(uri)
const db = "dat"
client.db(db, { useNewUrlParser: true, useUnifiedTopology: true });
const usersCollection = client.db(db).collection("users")

// Mongodb config

// Middleware

app.use(bodyParser.json())
const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))
// Middleware


// Routers 

app.use('/candidate', verifyToken, candidateRouter);
app.use('/job', verifyToken, jobRouter)
app.use('/user', userRouter);

// Routers


app.get('/', (req, res) => {
    return res.status(200).send("todo ok")
})


console.log(process.env.port)

app.listen(port, () => {
    console.log(`Express listinging on port ${port}`)
})