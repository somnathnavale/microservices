const mongoose = require('mongoose');

const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log('connected to DB');
    } catch (err) {
        console.log('err', err);
    }
}

module.exports=connectDB;
