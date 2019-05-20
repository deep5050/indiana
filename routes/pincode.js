const express = require('express');
const router = express.Router();
const log = require('signale');
const pincodeModel = require('../models/pincode');
const mongoose = require('mongoose');
const CJSON = require('circular-json');



router.get('/', getDefault, (req, res) => {
    res.json(res.results);
});

async function getDefault(req, res, next) {
    let results;
    try {
        results = await pincodeModel.find().limit(100);
        if (results == null || results.length ==0) return res.status(404).json({ mssg: "empty result" });
    } catch (err) {
        log.error(err);
        return res.status(500).json({ message: err.message });
    }
    res.results = results;
    next();
}


router.get('/state/:state', getByState, (req, res) => {
    res.json(res.results);
});

async function getByState(req, res, next) {
    // var state = capitalizeFirstLetter(state.toString());
    // var results = pincodeModel.find({State: "Bihar"});
    // res.send(CJSON.stringify(results));
    log.log(`accessing localhost/pincode/state/${req.params.state}`);
    let results;

    var state = req.params.state;

    try {
        results = await pincodeModel.find({ State: state });
       
        if (results == null || results.length ==0) {
            log.error("data not found");
            return res.status(404).json({ mssg: "not found anything" });
        }
    } catch (err) {
        log.error("Something went wrong");
        return res.status(500).json({ message: err.mssg });
        
    }
    res.results = results;
    log.success("Data Found");
    next();
}




router.get('/pin/:code([0-9]{6})',getByCode, (req, res) => {
    res.json(res.results);
});


async function getByCode(req, res,next) {
    log.log(`accessing localhost/pin/code/${req.params.code}`);
    let results;
    const code = req.params.code;
    try {
        results = await pincodeModel.find({Pincode:code});
        if(results == null || results.length ==0){
            log.error("data not found");
            return res.status(404).json({message:"not found anything"});
        }
        


    } catch (error) {
        log.error("something went wrong");
        return res.status(500).json({err:err.mssg});
        
    }
    log.success("Data found");
    res.results = results;
    next();
}


router.get('/pin/:range([0-9]{6}-[0-9]{6})',getByCodeRange, (req, res, next) => {
    res.json(res.results);
});

async function getByCodeRange(req, res,next) {
    
    log.log(`accessing localhost/pin/${req.params.range}`);
    var slices = req.params.range.toString().slice("-");
    var from= slices[0];
    var to = slices[1];

    let result;
    try {
        results = await pincodeModel.find({Pincode:{$gte:from},Pincode:{$lte:to}});
        if(results == null || results.length ==0)
        {
            log.error("data not found");
            return res.status(404).json({message:"data not found"});
        }
    } catch (error) {
        log.error("something Went Wrong");
        return res.status(500).json({message:err.mssg});
    }
    res.results = results;
    log.success("data found");
    next();
}



router.all("*", (req, res) => {
    log.error("requested URL does not exist !");
    res.send("Invalid URL");
})







function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = router;
