const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu45iww.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db('TaskDB').collection('users')
    const taskCollection = client.db('TaskDB').collection('tasks')
    const benefitCollection = client.db('TaskDB').collection('benefit')

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })


    app.post('/tasks', async (req, res) => {
        const task = req.body;
        const result = await taskCollection.insertOne(task)
        res.send(result)
    })

    app.get('/tasks', async (req, res) => {
        const result = await taskCollection.find().toArray()
        res.send(result)
      })

      app.delete('/tasks/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await taskCollection.deleteOne(query)
        res.send(result)
      })

      app.get('/benefit', async (req, res) => {
        const result = await benefitCollection.find().toArray()
        res.send(result)
      })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/',  (req, res) => {
    res.send('Getting Things Done server is running')
})

app.listen(port, () => {
    console.log(`Getting Things Done server is running on ${port}`);
})


