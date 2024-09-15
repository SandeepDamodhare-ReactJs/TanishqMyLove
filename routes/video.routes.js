
 
const express = require("express");
const { handleCreateVideo, handleGet } = require("../controller/video.controller");

const VideoRouter = express.Router();

VideoRouter.post("/create", handleCreateVideo);
VideoRouter.get("/:email", handleGet);

module.exports = {
    VideoRouter
};


