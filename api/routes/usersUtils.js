const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const usersColl = database.collection("users")
const bcrypt = require('bcrypt');

exports.findAllUsers = async () => {
    try {
        const query = {}
        const options = {
            sort: {"email": 1},
            projection: {_id: 0, email: 1, 'profile.first_name': 1}
        }

        const users = await usersColl.find(query, options).toArray();
        return users
    } catch (error) {
        console.log("Error in the find all users query")
    }
}

exports.addUser = async (newUser) => {
    const salt = await bcrypt.genSalt(10)
    newUser.pwd = await bcrypt.hash(newUser.pwd, salt)
    const result = await usersColl.insertOne(newUser)
    return result
}