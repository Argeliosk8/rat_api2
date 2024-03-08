const express = require('express');
const multer = require('multer')
const fs = require('fs')
const { S3Client, PutObjectAclCommand, PutObjectCommand } = require('@aws-sdk/client-s3');


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

// multer config

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

// multer config

candidateRouter = express.Router();

candidateRouter.post('/upload', upload.single('resume'), async (req, res) => {
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


  module.exports = candidateRouter