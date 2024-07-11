const express=require('express')
const app=express()
const port=process.env.PORT||5000
const cors=require('cors')
app.get('/',(req,res)=>{
    res.send('hello world')
})

//moddleware
app.use(cors());
app.use(express.json());

//mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://mern-book-store:Khushiram123@chat-application.zktskni.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://mern-book-store:Khushiram123@chat-application.zktskni.mongodb.net/?retryWrites=true&w=majority`
// mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority

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
    await client.connect();

    //create a collection of databse
    const bookCollections=client.db("BookInventory").collection("books");
    // insert a book to db:post method
    app.post("/upload-book",async(req,res)=>{
        const data=req.body;
        const result=await bookCollections.insertOne(data);
        res.send(result);
    })

    // get all books from the database
    // app.get("/all-books",async(req,res)=>{
    //     const books=bookCollections.find();
    //     const result=await books.toArray();
    //     res.send(result);
    // })

    //update a book data:patch or update method
    app.patch("/book/:id",async(req,res)=>{
        const id=req.params.id;
        const updateBookData=req.body;
        const filter={_id:new ObjectId(id)};
        const updateDoc={
            $set:{
                ...updateBookData
            },
        }
        const options={upsert:true};
        //update
        const result=await bookCollections.updateOne(filter,updateDoc,options);
        res.send(result);
    })

    //delete a book data
    app.delete("/book/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)};
        const result=await bookCollections.deleteOne(filter);
        res.send(result);
    })

    //find by category
    app.get("/all-books",async(req,res)=>{
        let query={};
        if(req.query?.category){
            query={category:req.query.category}
        }
        const result=await bookCollections.find(query).toArray();
        res.send(result);
        })


        // to get single book
        app.get("/book/:id",async(req,res)=>{
          const id=req.params.id;
          const filter={_id:new ObjectId(id)};
          const result=await bookCollections.findOne(filter);
          res.send(result);
        })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})



// Load environment variables from .env file

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();

// app.get('/', (req, res) => {
//     res.send('hello world');
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection string with environment variables
// const uri = `mongodb+srv://${process.env.VITE_USERNAME}:${process.env.VITE_PASSWORD}@chat-application.zktskni.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

//         // Create a collection of database
//         const bookCollections = client.db("BookInventory").collection("books");

//         // Insert a book to db: POST method
//         app.post("/upload-book", async (req, res) => {
//             const data = req.body;
//             const result = await bookCollections.insertOne(data);
//             res.send(result);
//         });

//         // Get all books from the database
//         // app.get("/all-books", async (req, res) => {
//         //     const books = bookCollections.find();
//         //     const result = await books.toArray();
//         //     res.send(result);
//         // });

//         // Update a book data: PATCH or UPDATE method
//         app.patch("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const updateBookData = req.body;
//             const filter = { _id: new ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     ...updateBookData
//                 },
//             };
//             const options = { upsert: true };
//             // Update
//             const result = await bookCollections.updateOne(filter, updateDoc, options);
//             res.send(result);
//         });

//         // Delete a book data
//         app.delete("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) };
//             const result = await bookCollections.deleteOne(filter);
//             res.send(result);
//         });

//         // Find by category
//         app.get("/all-books", async (req, res) => {
//             let query = {};
//             if (req.query?.category) {
//                 query = { category: req.query.category };
//             }
//             const result = await bookCollections.find(query).toArray();
//             res.send(result);
//         });

//         // To get a single book
//         app.get("/book/:id", async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) };
//             const result = await bookCollections.findOne(filter);
//             res.send(result);
//         });

//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });
