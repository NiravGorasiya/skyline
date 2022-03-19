const Book = require("../models/Book")
const { bookSchema } = require("../validator/bookV")
const { createResponse, successResponce,deleteResponce,queryErrorRelatedResponse } = require("../utils/sendResponse")
const mongoose = require("mongoose")

const bookaddCtrl = async (req, res, next) => {
    try {
        const { name, author, title, rating } = req.body;
        const book = new Book({
            name,
            author,
            title,
            rating
        });
        const result = await book.save();
        createResponse(req, res, result)
    } catch (error) {
        return next(error)
    }
}

const bookgetCtrl = async (req, res, next) => {
    try {
        const book = await Book.find()
        successResponce(req, res, book)
    } catch (error) {
        return next(error)
    }
}

const bookupdate = async (req, res, next) => {
    try {
        const { name, author, title, rating } = req.body;
        // Conver string is into Object id
        const id = mongoose.Types.ObjectId(req.params.id)
        //Find Attribute by params id     
        const book = await Book.findById(id);
        // Checking for Attribute existance with authenticate(JWT) token and params id
        if (!book) return queryErrorRelatedResponse(req, res, 404, "Book not found.");
        // check for Attribute add or not 
        book.name = name;
        book.author = author;
        book.title = title;
        book.rating = rating;
        const result = await book.save();
        return successResponce(req, res, result)
    } catch (error) {
        next(error);
    }
}

const bookdelete = async(req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return queryErrorRelatedResponse(req, res, 404, "Book not found.");
        book.delete();
        deleteResponce(req, res, "Book deleted successfully.");
    } catch (error) {
        return next(error)
    }
}
module.exports = { bookaddCtrl, bookgetCtrl, bookupdate,bookdelete }