const express = require('express');

const { addActivity, findActivityByJobId } = require('../utils/activityUtils.js')

activityRouter = express.Router();


activityRouter.post('/add/:jobid', async (req, res) => {
    const {jobid} = req.params
    const newAct = req.body 
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

    try {
        const result = await findActivityByJobId(jobid)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error finding your activity")
    }
    
})

module.exports = activityRouter