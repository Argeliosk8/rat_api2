const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3');
const fs = require('fs')
//const AWS = require('aws-sdk')
const { S3Client, PutObjectAclCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { MongoClient } = require("mongodb")
const { findAllUsers } = require('./utils/usersUtils')

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Mongodb config

const uri = process.env.URI
const client = new MongoClient(uri)
const db = "dat"
client.db(db, { useNewUrlParser: true, useUnifiedTopology: true });
const usersCollection = client.db(db).collection("users")

// Mongodb config

// s3Client config
const accessKey = process.env.YOUR_ACCESS_KEY_ID
const secretKey = process.env.YOUR_SECRET_ACCESS_KEY
const region = process.env.YOUR_REGION
const s3Bucket = process.env.S3_BUCKET

const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    }
  });

// s3Client config

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

  app.post('/upload', upload.single('resume'), async (req, res) => {
    const { originalname, path } = req.file
    const bodyFile = fs.createReadStream(path)
    const paramsSnap = {
        Bucket: 'ratresumes',
        Key: new Date().toISOString() + originalname,
        Body: bodyFile,
        ContentType: 'application/pdf',
        ACL: 'public-read',
    }

    try {
        const data = await s3Client.send(new PutObjectCommand(paramsSnap))
        console.log('Upload successful:', data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }

    const publicUrl = `https://${s3Bucket}.s3.${region}.amazonaws.com/${paramsSnap.Key}`
    console.log(publicUrl)
    res.send(publicUrl)
  });


app.get('/hello', (req, res) => {
    return res.status(200).send("hello mundo")
})

app.get('/', (req, res) => {
    return res.status(200).send("todo ok")
})

app.get('/users', async (req, res) => {
    const users = await findAllUsers()
    return res.status(200).send(users)
})

console.log(process.env.port)

app.listen(port, () => {
    console.log(`Express listinging on port ${port}`)
})