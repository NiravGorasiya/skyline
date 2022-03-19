const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"name is required"]
    },
    author: {
        type: String,
        required:[true,"author is required"]
    },
    title: {
        type: String,
        required:[true,"title is required"]
    },
    rating: {
        type: Number,
        required:[true,"rating is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);
