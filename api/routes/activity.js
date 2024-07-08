const express = require('express');

const { addActivity, findActivityByJobId, findActivityByJobIdAndDate, replaceOneActivity, findActivityByJobAndDate } = require('../utils/activityUtils.js')

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

activityRouter.post('/find/:jobid', async (req, res) => {
    const {jobid} = req.params
    const userEmail = req.user.email
    const {days} = req.body
    console.log(days)
    try {
        const result = await findActivityByJobAndDate(jobid, userEmail, days)
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

activityRouter.put('/updateone/:act_id', async (req, res) => {
    const {act_id} = req.params
    const newAct = req.body 
    newAct.user_email = req.user.email
    try {
        const result = await replaceOneActivity(act_id, newAct)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error updating the job")
    }
    
})

module.exports = activityRouter