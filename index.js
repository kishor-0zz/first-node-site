var express = require('express')
var cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
var app = express()
// middleware
app.use(cors());
app.use(express.json());




// db connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uata2qd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
   try {
      await client.connect();
      const collection = client.db("carGenis").collection("genis");
      app.get('/service', async (req, res) => {
         const query = {};
         const cursor = collection.find(query)
         const result = await cursor.toArray()
         res.send(result)
      })

      app.get('/service/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const param = await collection.findOne(query);
         res.send(param)
      })


      app.post('/service', async (req, res) => {
         const newData = req.body;
         const result = await collection.insertOne(newData)
         res.send(result)
      })

      app.delete('/service/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) }
         const resultt = await collection.deleteOne(query)
         res.send(resultt)
      })


   }
   finally {

   }
}
run().catch(console.dir);

app.listen(port, () => {
   console.log(port)
})