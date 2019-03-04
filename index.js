const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const pipeline = [
  {
    $project: { documentKey: false }
  }
];

MongoClient.connect(url, function(err, client) {
  if (!err) {
    const db = client.db('users');
    const collection = db.collection(process.env.DB_COLLECTION);
    let changeStream = collection.watch(pipeline);
    changeStream.on('change', function(change){
      //do stuff here
      console.log(change);
    })
  }
});
