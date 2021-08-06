import { MongoClient, ObjectId } from "mongodb";
import { DATA_BASE_URL } from "./URL_data_base";

export async function getOneMeetupId(id) {
    const client = await MongoClient.connect(DATA_BASE_URL);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(id) });

    await client.close();

    return selectedMeetup
}
