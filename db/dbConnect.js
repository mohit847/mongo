
//mongoose
//high level abstraction and more structured approach for working with mongo db

//external imports

const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {

    //use mongoose to connect this app to our databse on mongo db using DB_URL
    console.log(process.env.DB_URL)
    mongoose.connect(process.env.DB_URL, {
        // these are options to ensure that the connection is properly done
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    }).catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!')
        console.log(error)
    })
}

module.exports = dbConnect;
