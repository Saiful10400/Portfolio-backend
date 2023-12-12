const express=require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express()
const port=process.env.port || 5000
require("dotenv").config()
const cors=require("cors")
const cookieParser=require("cookie-parser")


app.use(cors())
app.use(express.json())
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qe6izo7.mongodb.net/?retryWrites=true&w=majority`;
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
 
 
    app.get("/",async(req,res)=>{
        res.send(`this server is running on ${port} port.`)
    })
    
    // post blog data into mongo db.
    const database=client.db("Saiful's_protfolio")

    const blogCollection=database.collection("Blogs")
    app.post("/post_blog", async(req,res)=>{
      const data=req.body
      
      const result=await blogCollection.insertOne(data)
      res.send(result)
      
    })


    // post project data into mongo db.

    const projectCollection=database.collection("Projects")
    app.post("/post_projects",async(req,res)=>{
      const data=req.body
      const result=await projectCollection.insertOne(data)
      res.send(result)
    })





    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
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
    console.log(`this server is running on https://localhost:${port}`)
})