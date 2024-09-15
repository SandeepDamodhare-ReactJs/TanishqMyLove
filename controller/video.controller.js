
const { Video } = require("../model/video.model");
const { UserModel } = require("../model/user.model");

const handleCreateVideo = async (req, res) => {
    try {
        const {videoname, imageArray ,email} = req.body;
        const user = await UserModel.findOne({  });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const { _id } = user;
        const video = new Video({ videoname, imageArray, userId: _id, email });

        const newVideo = await video.save();
        res.status(201).json({ msg: "Video created", success: true, newVideo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

const handleGet = async (req, res) => {
    const {email} = req.params
    try {
        const data = await Video.find({email:email});
        res.status(200).json({ msg: 'Data', data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    handleCreateVideo,
    handleGet
};
