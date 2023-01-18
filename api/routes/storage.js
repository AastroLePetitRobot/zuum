// const express = require('express');
// var router = express.Router();

// const dbo = require('../database/db');
// // const az_client = require('azstorage')


// const { BlobServiceClient } = require("@azure/storage-blob");

// /* GET users listing. */
// router.post('/file', async function(req, res) {

//     const blobServiceClient = BlobServiceClient.fromConnectionString(
//         AZURE_STORAGE_CONNECTION_STRING
//     );

//     const containerClient = blobServiceClient.getContainerClient(containerName)

//     let body = req.body
//     const blobName = body.filename;

//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     // Display blob name and url
//     console.log(
//     `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
//     );

//     // Upload data to the blob
//     const data = body.file;
//     const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
//     console.log(
//     `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
//     );


//     dbo.getDb().collection().insert_one({"roomId": body.roomId, "url": blockBlockClient.url, "displayName": body.displayName});

//     res.status(200).send("File successfully added");
    
// });

// module.exports = router;
