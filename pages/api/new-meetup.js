// /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(request, response) {
    if (request.method === 'POST') {
        const data = request.body;

        const client = await MongoClient.connect('mongodb+srv://nazarii_roshchuk_user:PoXMzXyiJjHgxHPd@cluster0.gbni1.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollections = db.collection('meetups');
        const result = await meetupsCollections.insertOne(data);

        console.log(result);

       await client.close();
       response.status(201).json({ message: 'Meetup inserted!'});
    }
}

export default handler;
