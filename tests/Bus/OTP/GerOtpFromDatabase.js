const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGO_DB_URL);

async function fetchMostRecentOtpFromMongo(phone) {
    if (!phone) {
        throw new Error('Phone number is required to fetch OTP.');
    }

    try {
        console.log('Connecting to MongoDB...');
        await mongoClient.connect();

        const database = mongoClient.db(process.env.MONGO_DB_DATABASE_NAME);
        const collection = database.collection(process.env.MONGO_DB_COLLECTION_NAME);
        console.log(collection);

        let code;
        while (!code) {
            const result = await collection
                .find({ phone })
                .sort({ createdAt: -1 }) // Assuming the collection has a timestamp field
                .limit(1)
                .toArray();

            if (result.length > 0 && result[0].code) {
                code = result[0].code;
                console.log(`OTP fetched from MongoDB: ${code}`);
            } else {
                console.log('No OTP found. Retrying in 10 seconds...');
                await new Promise(resolve => setTimeout(resolve, 10 * 1000)); // Wait 10 seconds before retrying
            }
        }
        return code;
    } catch (error) {
        console.error('Error fetching OTP from MongoDB:', error);
        throw error;
    } finally {
        console.log('Closing MongoDB connection...');
        await mongoClient.close();
    }
}

module.exports = { fetchMostRecentOtpFromMongo };
