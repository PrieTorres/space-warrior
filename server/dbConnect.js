import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbStringConnection = `mongodb+srv://${user}:${password}@spacewarrior.2fypyzc.mongodb.net/`;

mongoose.connect(dbStringConnection);

const db = mongoose.connection;

export default db;
