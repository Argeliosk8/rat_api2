const { MongoClient, MongoError, ObjectId } = require("mongodb")
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

exports.findJobsByProject = async (project_id) => {
  const query = {project_id: project_id}
  const options = {
    sort: {"name": 1},
    //projection: {_id: 0}
  }
  const allJobs = await jobsColl.find(query, options).toArray();
  return allJobs
}

exports.findOneJob = async (req) => {
    const result = await jobsColl.findOne({req: req})
    return result
  }

  exports.findOneJobById = async (id) => {
    const objectId = new ObjectId(id) 
    const result = await jobsColl.findOne({_id: objectId})
    return result
  }

  exports.addOneJob = async (id, newJob)=> {
    const session = client.startSession();
    try {
      session.startTransaction();
      //this session add a new record to the jobs collections
      const jobColl = client.db("dat").collection("jobs")
      const jobResult = await jobColl.insertOne(newJob, { session })
      
      //inserts the returned job id in the projects collection
      const projectColl = client.db("dat").collection("projects")
      const objectId = new ObjectId(id) 
      const filter = {_id: objectId}      
      const options = { upsert: true };    
      const updateDoc = {
        $push: {
          jobs: newJob
        },
      }; 
      
      const projectResult = await projectColl.updateOne(filter, updateDoc, options, { session })
      console.log(projectResult)
      projectResult.insertedId = jobResult.insertedId
      await session.commitTransaction();
      console.log('Transaction successfully committed.');
      return projectResult
    } catch (error) {
      /*
      Handle any exceptions thrown during the transaction and end the
      transaction. Roll back all the updates performed in the transaction.
    */
      if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
        // Add your logic to retry or handle the error
      }
      else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
        // Add your logic to retry or handle the error
      } else {
        console.log('An error occured in the transaction, performing a data rollback:' + error);
      }
      await session.abortTransaction();    
    } finally {
      await session.endSession();
    }
  }