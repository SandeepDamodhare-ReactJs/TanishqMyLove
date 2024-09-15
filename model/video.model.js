
// const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//     videoname: { type: String, required: true },
//     videoArray: { type: [String], required: true },
//     userId: { type: String, required: true },
//     email: {type: String, required: true }
// });

// const Video = mongoose.model('Video', videoSchema);

// module.exports = { Video };






const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoname: { type: String, required: true },
    videoArray: { type: [String], required: true },  // Array of video URLs
    userId: { type: String, required: true },
    email: { type: String, required: true }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };
