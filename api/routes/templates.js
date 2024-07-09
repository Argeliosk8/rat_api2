const express = require('express');
const {addTemplate, getTemplatesByUser} = require("../utils/templateUtils")

templatesRouter = express.Router();


templatesRouter.get('/ok', async (req, res) => {

    res.status(200).json("the templates rout is working")
    
})

templatesRouter.post('/addone', async(req, res)=>{
    const newTemplate = req.body
    newTemplate.user_id = req.user._id
    newTemplate.owner = req.user.email

    try {
        const result = await addTemplate(newTemplate)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json("error adding the new project")
    }
})

templatesRouter.post('/findall/', async(req, res)=>{
    const user_id = req.user._id

    try {
        const result = await getTemplatesByUser(user_id)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json("error adding the new project")
    }
})


module.exports = templatesRouter