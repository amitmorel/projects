const asm = require("../asm");
const express = require("express");
const router = express.Router();
const clc = require("cli-color");

router.use(express.json());

const record_model = require("./house.model");

router.get(
  "/",
  asm(async (req, res) => {
    const records = await record_model.find().select(`_id
                                                      title
                                                      type
                                                      description
                                                      image
                                                      price
                                                      space
                                                      reviewsCount
                                                      amenities
                                                      bookings
                                                      address
                                                      owner
                                                      reviews
                                                      rating
                                                     `);
    res.status(200).json(records);
    console.log(record_model);
  })
);

router.get(
  "/:id",
  asm(async (req, res) => {
    const record = await record_model.findById(req.params.id).select(`_id
                                                                      title
                                                                      type
                                                                      description
                                                                      image
                                                                      price
                                                                      space
                                                                      reviewsCount
                                                                      amenities
                                                                      bookings
                                                                      address
                                                                      owner
                                                                      reviews
                                                                      rating
                                                                      `);
    if (!record) return res.status(404).send("No record found.");
    res.status(200).json(record);
  })
);

router.put('/:id', asm( async (req, res)=> {
  const record = await record_model.findByIdAndUpdate(req.params.id, 
                                                  req.body, 
                                                  {new: true,upsert:true})
  res.status(200).json(record)
}))

module.exports = router;

