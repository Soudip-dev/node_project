const express = require("express")
const bodyparse = require("body-parser")
const mongoose = require("mongoose")

const app = express()
port = 3000;
// mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
//     console.log("Mongodb Connected")
//  }).catch((err) => {
//     console.log("Mongo Err",err)
//  })

mongoose.connect("mongodb+srv://soudip19:QtuNxs9v6H0XZmGV@cluster0.4kink.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

const { Schema, molel } = mongoose;
const userSchema = new Schema({
    name: String,
    age: Number,
    email:String
})

const User = mongoose.model("User", userSchema)

app.use(bodyparse.json());

app.get('/', async(req, res) => {
     const getUser =await User.find()
    res.json(getUser)
})

app.patch('/:id', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, {$set: {name: "My name has Changed"}, },{new: true})
    res.json("Updated Successfully>>>>>>>")
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id)
    res.json("Deleted Successfully>>>>>>>")
})

app.post('/', (req, res) => {
    const { name, age, email } = req.body;
    const newUser = new User({name: name, age: age, email: email})
    // const datafromclint = req.body
    console.log(newUser, "<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>")
    newUser.save();
     res.json("Hello api is working")
})

app.listen(port,() => {
   console.log(`Server is running on :${port}`) 
})

