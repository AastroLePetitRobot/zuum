const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
var router = express.Router();
var upload = multer({ dest: "uploads/" });

const client = require('../database/db');
const database = process.env.MAIN_DATABASE || 'zuum';


/* GET users listing. */
router.get('/rooms', async function (req, res) {

    try {
        console.log("room")
        let query = req.query;

        let fileList = await client.db(database).collection("rooms").find({ roomId: query.roomId }).toArray();

        console.log(fileList)

        res.json(fileList);
    } catch (error) { console.log(error) }

});

router.post('/rooms/items/delete', async function (req, res) {
    let roomId = req.body.roomId;
    let newlist = req.body.newList;

    console.log(req.body)
    console.log(newlist)

    await client.db(database).collection("rooms").updateMany({ roomId: roomId }, { $set: { items: newlist } });

    res.status(200).send("Update complete");
});

router.post('/rooms/items/add', upload.single('file'), async function (req, res) {
    try {
        console.log(req.body);

        const blobName = req.body.displayName;
        const roomId = req.body.roomId;

        let newfile = {};

        if (req.body.fileType == 'file') {

            const file = req.file;

            const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=sideproject01;AccountKey=PiY6VHA70RaHO/Xuf9in1Y8FQAONuq1WSHL894fV50i6VwMQ75AHRo4Hep1gfF7eY/ckAHrf8WYc+AStCAySWg==;EndpointSuffix=core.windows.net");

            const containerClient = blobServiceClient.getContainerClient("zuum")

            const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);

            blockBlobClient.uploadFile(file.path);

            console.log(`Blob was uploaded successfully`);

            newfile = { displayName: blobName, url: blockBlobClient.url }
        }

        else if (req.body.fileType == 'url') {
            newfile = { displayName: blobName, url: req.body.url}
        }

        console.log(newfile)

        let result = await client.db(database).collection("rooms").updateMany({ roomId: roomId }, { $push: { items: newfile } });

        console.log(result)

        res.status(200).send("Update complete");
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
});

module.exports = router;
