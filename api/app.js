const express = require('express');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());

app.get('/hello', (req, res) => {
    return res.status(200).send("hello mundo")
})

app.get('/', (req, res) => {
    return res.status(200).send("todo ok")
})

console.log(process.env.port)

app.listen(port, () => {
    console.log(`Express listinging on port ${port}`)
})