const asm = require('../../utils/async_middleware')
const express = require('express')
const clc = require('cli-color')
const record_model = require('./record.model')

const router = express.Router()

router.use(express.json())


router.post('/', asm( async (req, res)=> {
    console.log('create a record, req.body:', req.body)  
    const record = await record_model.create(req.body) 
    res.status(200).json(record)       
}))

router.get('/', asm( async(req, res)=> {
    const records = await record_model.find() 
                                .select(`_id 
                                         record_name
                                         location
                                         income
                                         amount
                                         details`) 
    res.status(200).json(records)
}))

router.get('/:id', asm(async (req, res)=> {
    const record = await record_model.findById(req.params.id) 
                                .select(`_id 
                                        record_name
                                        location
                                        income
                                        amount
                                        details`)
    if (!record) return res.status(404).send("No record found.")
    res.status(200).json(record)
}))

router.delete('/:id', asm( async (req, res) => {
    const record = await record_model.findByIdAndRemove(req.params.id)
    res.status(200).json(record)
}))

router.put('/:id', asm( async (req, res)=> {
    const record = await record_model.findByIdAndUpdate(req.params.id, 
                                                    req.body, 
                                                    {new: true,upsert:true})
    res.status(200).json(record)
}))

module.exports = router

