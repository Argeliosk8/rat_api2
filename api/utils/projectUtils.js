const { MongoClient, ObjectId, MongoError } = require("mongodb")
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

exports.findOneProject = async (id) => {
    const objectId = new ObjectId(id)
    const result = await projectsColl.findOne({_id: objectId})
    return result
  }

  exports.addOneProject = async (newJob)=> {
    const result = await projectsColl.insertOne(newJob)
    return result
  }

  exports.replaceOneProject = async (id, newProject)=> {
    const objectId = new ObjectId(id) 
    const filter = {_id: objectId}
    const result = await projectsColl.replaceOne(filter, newProject)
    return result
  }