import mongoose, { Connection } from "mongoose";

let db: Connection;

const MongoDBConnect = async (): Promise<Connection | undefined> => {
    if (db) return db;

    try {
        // const uri: string = `mongodb://127.0.0.1:27017`;
        const uri = process.env.MONGODB_URI as string;

        await mongoose
            .connect(uri)
            .then(() => console.log("Connection successful"))
            .catch((err) => console.log(err));
        db = mongoose.connection;
        return db;
    } catch (error : any) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default MongoDBConnect;