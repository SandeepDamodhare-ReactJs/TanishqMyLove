
 
const express = require("express");
const { handleCreateAlbum, handleGet } = require("../controller/ablum.controller");

const AlbumRouter = express.Router();

AlbumRouter.post("/create", handleCreateAlbum);
AlbumRouter.get("/:email", handleGet);

module.exports = {
    AlbumRouter
};


