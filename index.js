const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// midlwere
require('dotenv').config()
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrdaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
const run = async () => {
    try {
        await client.connect();
        const database = client.db("hotelTulip");
        const roomsCollection = database.collection("rooms");
        const orderCollection = database.collection('orders')
        console.log('database connected')
        
        app.get('/rooms', async (req, res) => {
            const cursor = roomsCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/rooms', async (req, res) => {
            const newEvent = req.body
            const result = await roomsCollection.insertOne(newEvent)
            res.json(result)
        })

        app.post('/orders', async (req, res) => {
            const newPlan = req.body
            const result = await orderCollection.insertOne(newPlan)
            res.json(result)
        })

        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id
            const cursor = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(cursor)
            res.json(result)
        })
    }
    finally {
        
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World! I am Live from Assignment_11')
})

app.listen(port, () => {
    console.log(`Hello I'am running from assignment_11`, port)
})