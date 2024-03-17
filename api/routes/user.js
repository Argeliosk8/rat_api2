const express = require('express');
const { addUser, findAllUsers, findOneUser, hashCheck, getToken, verifyToken } = require('../utils/usersUtils')

userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    const user = await findOneUser(email)

    if(!user) return res.status(403).send({msg: "user not found" })

    const resultHashCheck = await hashCheck(password, user.pwd)
    
    if(!resultHashCheck) return res.status(403).send({msg: "hash check failed" })

    const token = await getToken(user)
    
    if(!token) return res.status(403).send({msg: "token request failed" })
    
    res.status(200).json({user: user, token: token})
})

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

userRouter.get('/all', verifyToken, async (req, res) => {
    const users = await findAllUsers()
    return res.status(200).send(users)
})

module.exports = userRouter