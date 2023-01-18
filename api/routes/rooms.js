const express = require('express');
var router = express.Router();

const client = require('../database/db');
const database = process.env.MAIN_DATABASE || 'zuum';


/* GET users listing. */
router.get('/rooms', async function(req, res) {

    try {
    console.log("room")
    let query = req.query;

    let fileList = await client.db(database).collection("rooms").find({roomId: query.roomId}).toArray();
    
    console.log(fileList)
    
    res.json(fileList);
} catch (error) { console.log(error)}

});

router.post('/rooms/items/delete', async function(req, res) {
    let roomId = req.body.roomId;
    let newlist = req.body.newList;

    console.log(req.body)
    console.log(newlist)
    
    await client.db(database).collection("rooms").updateMany({roomId: roomId}, {$set: {items: newlist}}); 

    res.status(200).send("Update complete");
});

router.post('/rooms/items/add', async function(req, res) {
    let roomId = req.query.roomId;
    let newItem = req.query.newItem;
    
    await client.db(database).collection("rooms").updateMany({roomId: roomId}, {$push: {items: newItem}}); 

    res.status(200).send("Update complete");
});

module.exports = router;
