const { MongoClient } = require('mongodb');
const {throws} = require("node:assert");
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGO_URL);

async function fetchMostRecentOtpFromMongo(phone) {
    if (!phone) {
        throw new Error('Phone number is required to fetch OTP.');
    }

    let code;
    try {
        console.log('Connecting to MongoDB...');
        await mongoClient.connect();

        const database = mongoClient.db(process.env.MONGO_DATABASE_NAME);
        console.log(`Connected to Database: ${process.env.MONGO_DATABASE_NAME}`);
        const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
        console.log(`Connected to Collection: ${process.env.MONGO_COLLECTION_NAME}`);

        console.log(`Searching for OTP for phone: ${phone}`);
        const result = await collection
            .find({ phone })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        if (result.length > 0 && result[0].code) {
            code = result[0].code;
            console.log(`OTP fetched from MongoDB: ${result[0].code}`);
        } else {
            console.log('No OTP found for the given phone number.');
        }
    } catch (error) {
        throw new Error(`Failed to fetch OTP from MongoDB: ${error.message}`);
    } finally {
        console.log('Closing MongoDB connection...');
        await mongoClient.close();
    }
    return code;
}

module.exports = { fetchMostRecentOtpFromMongo };
