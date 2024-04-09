const express = require('express');
const { addOneProject, findAllProjects, findOneProject, replaceOneProject } = require('../utils/projectUtils.js')
projectRouter = express.Router();


//This route handles the submission of a new candidate to the mongoDB

projectRouter.post('/findone', async (req, res) => {
    const {id} = req.body
    console.log(id)
    const result = await findOneProject(id)
    console.log(result)
    res.status(200).json(result)
})

projectRouter.get('/findall', async (req, res) => {
    try {
        const result = await findAllProjects()
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("There was an error retrieving the jobs")
    }
})

projectRouter.post('/addone', async(req, res)=>{
    const newProject = req.body
    newProject.user_id = req.user._id
    newProject.owner = req.user.email

    try {
        const result = await addOneProject(newProject)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json("error adding the new project")
    }
})

projectRouter.put('/replaceone/:id', async(req, res)=>{
    const {id} = req.params
    const newProject = req.body
    newProject.user_id = req.user._id
    newProject.owner = req.user.email
    try {
        const result = await replaceOneProject(id, newProject)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json("error adding the new project")
    }
})

module.exports = projectRouter