const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const usersColl = database.collection("users")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const util = require('util');

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

exports.findOneUser = async (email) => {
    const result = await usersColl.findOne({email: email})
    return result
  }

exports.hashCheck = async (pwd, hash) => {
    const result = bcrypt.compareSync(pwd, hash)
    return result
}


exports.getToken = async (user) => {
    const signAsync = util.promisify(jwt.sign);
   try {
    const token = await signAsync(user, process.env.JWT_SECRET)
    return token
   } catch (error) {
    console.error('Error:', err);
    throw err;
   }
}