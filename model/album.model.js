
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumname: { type: String, required: true },
    imageArray: { type: [String], required: true },
    userId: { type: String, required: true },
    email: {type: String, required: true }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album };
