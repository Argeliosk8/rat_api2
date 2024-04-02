const express = require('express');
const { findOneJob, addOneJob, findAllJobs } = require('../utils/jobUtils')
jobRouter = express.Router();


//This route handles the submission of a new candidate to the mongoDB

jobRouter.get('/findone', async (req, res) => {
    const {requisition} = req.body
    const result = await findOneJob(requisition)
    console.log(result)
    res.status(200).json(result)
})

jobRouter.get('/findall', async (req, res) => {
    try {
        const result = await findAllJobs()
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("There was an error retrieving the jobs")
    }
})

jobRouter.post('/addone', async(req, res)=>{
    const newJob = req.body
    newJob.creator = req.user.email
    newJob.user_id = req.user._id
    try {
        const result = await addOneJob(newJob)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json("error adding the new job")
    }
})

module.exports = jobRouter