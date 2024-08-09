
const { Album } = require("../model/album.model");
const { UserModel } = require("../model/user.model");

const handleCreateAlbum = async (req, res) => {
    try {
        const {albumname, imageArray } = req.body;
        const user = await UserModel.findOne({  });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const { _id } = user;
        const album = new Album({ albumname, imageArray, userId: _id });

        const newAlbum = await album.save();
        res.status(201).json({ msg: "Album created", success: true, newAlbum });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

const handleGet = async (req, res) => {
    try {
        const data = await Album.find();
        res.status(200).json({ msg: 'Data', data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    handleCreateAlbum,
    handleGet
};
