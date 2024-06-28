const express = require('express');
const { replaceOneJob, findOneJob, addOneJob, findAllJobs, findJobsByProject, findOneJobById } = require('../utils/jobUtils')
//const { addProjectJob } = require('../utils/projectUtils')
jobRouter = express.Router();


//This route handles the submission of a new candidate to the mongoDB

jobRouter.get('/findone', async (req, res) => {
    const {requisition} = req.body
    const result = await findOneJob(requisition)
    console.log(result)
    res.status(200).json(result)
})

jobRouter.get('/findall', async (req, res) => {
    console.log(req.user.email)
    const userEmail = req.user.email
    try {
        const result = await findAllJobs(userEmail)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("There was an error retrieving the jobs")
    }
})


jobRouter.post('/addone/:projectid', async(req, res)=>{
    const newJob = req.body
    newJob.creator = req.user.email
    newJob.user_id = req.user._id 
    const {projectid} = req.params
    newJob.project_id = projectid
    try {
        const result = await addOneJob(projectid, newJob)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json("error adding the new job")
    }
})


jobRouter.get('/findbyprojectid/:projectid', async (req, res) => {
    const {projectid} = req.params
    const result = await findJobsByProject(projectid)
    console.log(result)
    res.status(200).json(result)
})

jobRouter.get('/findonebyid/:jobid', async (req, res) => {
    const {jobid} = req.params
    const result = await findOneJobById(jobid)
    console.log(result)
    res.status(200).json(result)
})

jobRouter.put('/updateone/:jobid', async (req, res) => {
    const {jobid} = req.params
    const updatedJob = req.body 
    try {
        const result = await replaceOneJob(jobid, updatedJob)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error updating the job")
    }
    
})

module.exports = jobRouter