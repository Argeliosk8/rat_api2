const { MongoClient } = require("mongodb");
const multer = require("multer");
const uri = process.env.URI
const client = new MongoClient(uri)
require('dotenv').config()
const database = client.db('dat');
const candidatesColl = database.collection('candidates');
const usersColl = database.collection('users')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// s3Client config
const accessKey = process.env.YOUR_ACCESS_KEY_ID
const secretKey = process.env.YOUR_SECRET_ACCESS_KEY
const region = process.env.YOUR_REGION


const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    }
  });

// s3Client config

// multer config

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

// multer config

exports.multerUploadResume = multer({storage})

exports.s3UploadResume = async (paramsSnap) => {
  const data = await s3Client.send(new PutObjectCommand(paramsSnap))
  return data
}

exports.submitCandidate = async (newCandidate) => {
    const result = await candidatesColl.insertOne(newCandidate)
      return result
  }