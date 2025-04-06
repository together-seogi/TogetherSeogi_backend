import mongo from "mongoose"
import { config } from "dotenv";
config();

export function linkToDatabase() {
    let murl; let env = process.env;
    murl = `${env.DB_URL}`
    mongo.connect(`${murl}`).then(() => {
        console.log('db connected');
    }).catch((e) => {
        throw new Error(e);
    });
}