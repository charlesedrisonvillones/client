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
      console.log(error);
    }
  })
  

app.get('/pigs', auth, async (req, res ) => {
  try {
    const pigs= await pool.query("SELECT * FROM pigs"
  );

  res.json(pigs.rows)
  } catch (error){
    console.log(error);
  }
  
})

app.post('/pigs', auth, async (req, res) => {
  try {
    const {name, sow, weight, type} = req.body
    console.log(req.body)
    const newPig = await pool.query ("INSERT INTO pigs (name, sow, weight, type) VALUES($1, $2, $3, $4)",[name, sow, weight, type])
    res.json("new Pig added")
    
  } catch (error) {
    console.log(error);
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

app.post('/editPigs', auth, async (req, res ) => {
    try {
      const {weight, id} = req.body
      
      const editPigs= await pool.query("UPDATE pigs SET weight = $1 WHERE id=$2",[
        weight, id
      ])
    
      res.json("pigs have been edited")
    } catch (error) {
      console.log(error)
    }
  });

app.delete('/pigs/:id', auth, async (req, res) => {
  try {
    const {id} = req.params;
    const deletePig = await pool.query ("DELETE FROM pigs WHERE id=$1",[id]);
    res.json("Pig was deleted")
      
  } catch (error) {
    console.log(error);
  }
  })
 

app.get('/feeds', auth, async (req, res ) => {
  try {
    const feeds= await pool.query("SELECT * FROM feeds"
      );
    
    res.json(feeds.rows)
    } catch (error){
      console.log(error);
    }
      
    })
app.post('/editFeeds', auth, async (req, res ) => {
  try {
    const {stocks, name_id} = req.body
    console.log(req.body)
    const editFeeds= await pool.query("UPDATE feeds SET stocks = $1 WHERE name_id=$2",[
      stocks, name_id
    ])

    res.json("feeds have been edited")
  } catch (error) {
    console.log(error)
  }
});

app.post('/feeds', auth, async (req, res) => {
  try {
    const {name, stocks} = req.body;
    
    const addFeed = await pool.query ('INSERT INTO feeds (name, stocks) VALUES($1, $2)',[name, stocks])
    res.json("new Feeds added")
        
      } catch (error) {
        console.log(error);
      }
    })

app.delete('/feeds/:name_id',  auth, async (req, res) => {
  try {
    const {name_id} = req.params;
    console.log(req.params)
    const deleteFeed = await pool.query ("DELETE FROM feeds WHERE name_id=$1",[name_id]);
    res.json("Feed was deleted");
          
      } catch (error) {
        console.log(error);
      }
      })

app.get('/medicines', auth, async (req, res ) => {
  try {
    const medicines= await pool.query("SELECT * FROM medicines"
          );
        
    res.json(medicines.rows)
    } catch (error){
    console.log(error);
        }
          
        })

app.post('/editMedicines', auth, async (req, res) => {
  try {
    const {stocks, name_id} = req.body
    console.log(stocks)
    const editMedicines= await pool.query("UPDATE medicines SET stocks = $1 WHERE name_id=$2",[
      stocks, name_id
    ])

    res.json("medicines have been edited")
  } catch (error) {
    console.log(error)
  }
});
    
app.post('/medicines', auth, async (req, res) => {
  try {
    const {name, stocks, expiration_date} = req.body;
    // console.log(req.body)
    console.log(name, stocks, expiration_date)
    const newMedicine = await pool.query('INSERT INTO medicines (name, stocks, expiration_date) VALUES($1, $2, $3)',[name, stocks, expiration_date])
    res.json("new medicines added")
            
    } catch (error) {
    console.log(error);
        }
        })

app.delete('/medicines/:name_id', auth, async (req, res) => {
  try {
    const {name_id} = req.params;
    const deleteFeed = await pool.query ("DELETE FROM medicines WHERE name_id=$1",[name_id]);
    res.json("Medicine was deleted")
                  
    } catch (error) {
    console.log(error);
        }
        })




