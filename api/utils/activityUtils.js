const { MongoClient, MongoError, ObjectId } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const actColl = database.collection("activity")

  exports.addActivity = async (newAct, jobid)=> {
    const objectId = new ObjectId(jobid)
    const currentDate = new Date();
    const dateOnly = currentDate.toISOString().split('T')[0];
    newAct.job_id = objectId
    newAct.sub_date = dateOnly

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