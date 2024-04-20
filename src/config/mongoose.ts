import {connect, set} from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/taskmanager';

(async () => {
    try {
        set("strictQuery", false);
        const db = await connect(MONGO_DB_URI);
        console.log(`Connected to ${db.connection.name}`);
    } catch (error) {
        console.error(error);
    }
})();