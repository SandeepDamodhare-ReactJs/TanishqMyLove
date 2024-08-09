
 
const express = require("express");
const { handleCreateAlbum, handleGet } = require("../controller/ablum.controller");

const AlbumRouter = express.Router();

AlbumRouter.post("/create", handleCreateAlbum);
AlbumRouter.get("/", handleGet);

module.exports = {
    AlbumRouter
};


