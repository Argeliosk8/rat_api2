const express = require('express');
const fs = require('fs')
const { submitCandidate, multerUploadResume, s3UploadResume } = require('./candidateUtils');



candidateRouter = express.Router();

//This route handles the upload of a the received resume to an S3 bucket
const s3Bucket = process.env.S3_BUCKET
const region = process.env.YOUR_REGION

candidateRouter.post('/upload', multerUploadResume.single('resume'), async (req, res) => {
    const { originalname, path } = req.file
    const bodyFile = fs.createReadStream(path)
    const paramsSnap = {
        Bucket: s3Bucket,
        Key: new Date().toISOString() + originalname,
        Body: bodyFile,
        ContentType: 'application/pdf',
        ACL: 'public-read',
    }

    try {
        const data = await s3UploadResume(paramsSnap)
        console.log('Upload successful:', data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }

    const publicUrl = `https://${s3Bucket}.s3.${region}.amazonaws.com/${paramsSnap.Key}`
    console.log(publicUrl)
    res.send({url: publicUrl})
  });

//This route handles the submission of a new candidate to the mongoDB

candidateRouter.post('/submit', async (req, res) => {
    const newCandidate = req.body
    console.log(newCandidate)
    try {
        const result = await submitCandidate(newCandidate)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(result)
    }
    
})


module.exports = candidateRouter