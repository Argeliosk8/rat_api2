const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require("mongodb")
const { findAllUsers } = require('./utils/usersUtils')

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Mongodb config

const uri = process.env.URI
const client = new MongoClient(uri)
const db = "dat"
client.db(db, { useNewUrlParser: true, useUnifiedTopology: true });
const usersCollection = client.db(db).collection("users")

// Mongodb config

app.get('/hello', (req, res) => {
    return res.status(200).send("hello mundo")
})

app.get('/', (req, res) => {
    return res.status(200).send("todo ok")
})

app.get('/users', async (req, res) => {
    const users = await findAllUsers()
    return res.status(200).send(users)
})

console.log(process.env.port)

app.listen(port, () => {
    console.log(`Express listinging on port ${port}`)
})