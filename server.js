// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./config/db");


// ================= APP INIT =================
const app = express();


// ================= DATABASE CONNECTION =================
connectDB();


// ================= MIDDLEWARE =================
app.use(express.json());

app.use(cors({
    origin: "https://personalportfolio-six-rho.vercel.app",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
}));

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


// ================= TEST ROUTE =================
app.get("/api/test", (req, res) => {
    res.json({
        message: "API working properly ✅"
    });
});


// ================= SCHEMA =================
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


// ================= MODEL =================
const Contact = mongoose.model("Contact", contactSchema);


// ================= ADMIN =================
const ADMIN = {
    username: process.env.ADMIN_USERNAME,
    password: bcrypt.hashSync(
        process.env.ADMIN_PASSWORD,
        10
    )
};


// ================= AUTH MIDDLEWARE =================
function verifyToken(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            message: "Access denied. No token ❌"
        });
    }


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch(error){

        res.status(401).json({
            message:"Invalid token ❌"
        });

    }
}


// ================= LOGIN API =================
app.post("/api/login", async(req,res)=>{

    const {
        username,
        password
    } = req.body;


    if(username !== ADMIN.username){

        return res.status(401).json({
            message:"Invalid username ❌"
        });

    }


    const passwordMatch =
        await bcrypt.compare(
            password,
            ADMIN.password
        );


    if(!passwordMatch){

        return res.status(401).json({
            message:"Invalid password ❌"
        });

    }


    const token = jwt.sign(
        {
            username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    );


    res.json({
        message:"Login successful ✅",
        token
    });

});



// ================= CREATE CONTACT =================
app.post("/api/contact", async(req,res)=>{

    try{

        const contact =
        new Contact(req.body);


        await contact.save();


        res.status(201).json({
            message:"Message saved successfully ✅"
        });


    }
    catch(error){

        res.status(500).json({
            error:"Something went wrong ❌"
        });

    }

});



// ================= READ CONTACT =================
app.get("/api/contact",
verifyToken,
async(req,res)=>{

    try{

        const data =
        await Contact.find()
        .sort({
            createdAt:-1
        });


        res.json(data);

    }
    catch(error){

        res.status(500).json({
            error:"Fetching failed ❌"
        });

    }

});



// ================= DELETE CONTACT =================
app.delete("/api/contact/:id",
verifyToken,
async(req,res)=>{

    try{

        await Contact.findByIdAndDelete(
            req.params.id
        );


        res.json({
            message:"Deleted successfully ✅"
        });

    }
    catch(error){

        res.status(500).json({
            error:"Delete failed ❌"
        });

    }

});

// ================= SERVE FRONTEND =================
const path = require("path");

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route (important for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT} 🚀`
    );

});