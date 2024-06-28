const express = require('express');

const { addActivity, findActivityByJobId, findActivityByJobIdAndDate, replaceOneActivity } = require('../utils/activityUtils.js')

activityRouter = express.Router();


activityRouter.post('/add/:jobid', async (req, res) => {
    const {jobid} = req.params
    const newAct = req.body 
    newAct.user_email = req.user.email
    try {
        const result = await addActivity(newAct, jobid)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error adding your activity")
    }
    
})

activityRouter.get('/find/:jobid', async (req, res) => {
    const {jobid} = req.params
    const userEmail = req.user.email
    try {
        const result = await findActivityByJobId(jobid, userEmail)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error finding your activity")
    }
    
})

activityRouter.post('/findone', async (req, res) => {
    const {date, job_id} = req.body
    const userEmail = req.user.email
    try {
        const result = await findActivityByJobIdAndDate(date, job_id, userEmail)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error finding your activity")
    }
    
})

activityRouter.put('/updateone/:job_id', async (req, res) => {
    const {job_id} = req.params
    const newAct = req.body 
    try {
        const result = await replaceOneActivity(job_id, newAct)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error updating the job")
    }
    
})

module.exports = activityRouter