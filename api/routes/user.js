const express = require('express');
const { addUser, findAllUsers} = require('./usersUtils')

userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const newUser = req.body
    try {
        const result = await addUser(newUser)
        console.log(result)
        res.status(200).json({msg: result})
    } catch (err) {
        console.log(`there was an error signing up: ${err}`)
        res.status(403).json({msg: 'there was an error signing up'})        
    }
})

userRouter.get('/all', async (req, res) => {
    const users = await findAllUsers()
    return res.status(200).send(users)
})

module.exports = userRouter