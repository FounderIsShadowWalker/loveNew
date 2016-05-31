var mongoose = require('mongoose');

function connectMongoDB() {

    var db = mongoose.connect('mongodb://localhost/test', function (err) {
        if (err)  throw  err;
    })

    return db;
}

module.exports = connectMongoDB();