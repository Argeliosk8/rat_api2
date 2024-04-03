const { MongoClient } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const projectsColl = database.collection("projects")


exports.findAllProjects = async () => {
  const query = {}
  const allProjects = await projectsColl.find(query).toArray();
  return allProjects
}

exports.findOneJob = async (req) => {
    const result = await jobsColl.findOne({req: req})
    return result
  }

  exports.addOneProject = async (newJob)=> {
    const result = await projectsColl.insertOne(newJob)
    return result
  }