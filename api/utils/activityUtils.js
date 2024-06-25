const { MongoClient, MongoError, ObjectId } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const actColl = database.collection("activity")

  exports.addActivity = async (newAct, jobid)=> {
    const objectId = new ObjectId(jobid)
    newAct.job_id = objectId

    const result = await actColl.insertOne(newAct)
    console.log(result)
    return result
  }

  exports.findActivityByJobId = async (jobid)=> {
    const objectId = new ObjectId(jobid)
    const query = {job_id: objectId}
    const result = await actColl.find(query).toArray()
    console.log(result)
    return result
  }

  exports.findActivityByJobIdAndDate = async (date, job_id)=> {
    const objectId = new ObjectId(job_id)
    const query = {job_id: objectId, date: date}
    console.log(query)
    const result = await actColl.findOne(query)
    console.log(result)
    return result
  }

  exports.replaceOneActivity = async (job_id, newAct)=> {
    const objectId = new ObjectId(job_id) 
    const date = newAct.date
    newAct.job_id = objectId
    console.log(newAct)
    const filter = {job_id: objectId, date: date}
    const result = await actColl.replaceOne(filter, newAct)
    return result
  }