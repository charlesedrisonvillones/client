// const express = require("express");
// const app = express();
// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// //ROUTES

// //register and login routes
// app.use("/auth", require("./routes/jwtAuth"));

// app.listen(5000, () => {
//     console.log("server is running on port 5000");
// });

import bodyParser from "body-parser";
import { connectDatabase } from "./pool.js"
import { generateJWT } from "./jwt/jwtGenerator.js";
import { auth } from "./middleware/auth.js";
import  express  from "express";
import bcrypt from "bcrypt" 
import cors from "cors"




const app = express()
const pool = connectDatabase()
const PORT = 8000

app.use(express.json());
app.use(cors());


//registering

app.post("/register", async(req,res) => {
    try { 

        //1. destructure the req.body (name, email, password)

        const {name, email, password} = req.body; 

        //2. check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        //3. Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

    //     const newUser = await pool.query(`
    // INSERT INTO users (uuid, username, password)
    // VALUES ($1, $2, $3) RETURNING *
    // `, [uuidv4(), username, bcryptPassword]))


        //4. enter the new user inside our database

        const newUser = await pool.query(`INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *`, [name, email, bcryptPassword]);

       



        //5. generating our jwt token

        const token = generateJWT(newUser.rows[0]);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//login route

app.post("/login", async(req,res) => {
    try {

        const { email, password} = req.body; 

        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);

        if (user.rows[0].length < 0) {
             return res.status(401).send("Username or password is incorrect");
        }
        console.log("b")
        console.log(password)
        console.log(user.rows[0])

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
       
        if (!validPassword) {
            return res.status(401).json("Password or username is incorrect")
        }

        const token = generateJWT(user.rows[0]);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
 
app.get('/profile', auth, async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      console.log(err);
    }
  })
  
  pool.connect((err) => {
      if (err) {
        console.log(err.message);
      }
      {
        app.listen(PORT, () => {
          console.log(`Server started on http://localhost:${PORT}`);
        });
      }
    });



