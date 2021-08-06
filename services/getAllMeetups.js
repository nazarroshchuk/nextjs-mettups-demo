import { MongoClient } from "mongodb";
import { DATA_BASE_URL } from "./URL_data_base";

export async function getAllMeetups() {

    const client = await MongoClient.connect(DATA_BASE_URL)
    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const meetups = await meetupsCollections.find().toArray();
    await client.close();

    return meetups;
}
