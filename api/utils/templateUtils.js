const { MongoClient, MongoError, ObjectId } = require("mongodb")
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const database = client.db("dat")
const actColl = database.collection("templates")

  exports.addTemplate = async (newTemplate)=> {
    const result = await actColl.insertOne(newTemplate)
    console.log(result)
    return result
  }


  exports.getTemplatesByUser = async (user_id)=> {
    const filter = {
      user_id: user_id
    }
    const result = await actColl.find(filter).toArray()
    console.log(result)
    return result
  }







