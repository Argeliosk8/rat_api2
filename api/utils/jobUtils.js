const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const jobsColl = database.collection("jobs")
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

exports.findAllJobs = async () => {
  const query = {}
  const options = {
    sort: {"name": 1},
    projection: {_id: 0}
  }
  const allJobs = await jobsColl.find(query, options).toArray();
  return allJobs
}

exports.findOneJob = async (req) => {
    const result = await jobsColl.findOne({req: req})
    return result
  }

  exports.addOneJob = async (newJob)=> {
    const result = await jobsColl.insertOne(newJob)
    return result
  }