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

  exports.findActivityByJobId = async (jobid, userEmail)=> {
    const objectId = new ObjectId(jobid)
    const query = {job_id: objectId, user_email: userEmail}
    const result = await actColl.find(query).toArray()
    console.log(result)
    return result
  }

  exports.findActivityByJobIdAndDate = async (date, job_id, userEmail)=> {
    const objectId = new ObjectId(job_id)
    const query = {job_id: objectId, date: date, user_email: userEmail}
    console.log(query)
    const result = await actColl.findOne(query)
    console.log(result)
    return result
  }

  exports.replaceOneActivity = async (act_id, newAct)=> {
    const objectId = new ObjectId(act_id) 
    const jobID = new ObjectId(newAct.job_id)
    newAct.job_id = jobID
    console.log(newAct)
    const filter = {_id: objectId}
    const result = await actColl.replaceOne(filter, newAct)
    return result
  }

  exports.findActivityByJobAndDate = async (jobid, userEmail, days)=> {
    const objectId = new ObjectId(jobid)
    const query = {user_email: userEmail, job_id: objectId, date: {$in: days}}
    const result = await actColl.find(query).toArray()
    console.log(result)
    return result
  }