import { generateJWT } from "../jwt/jwtGenerator.js";
import  express  from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDatabase } from "../pool.js";


const router = express.Router();
const pool = connectDatabase();







router.post("/login", async(req,res) => {
    try {

        const { email, password} = req.body; 

        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);

        if (user.rows[0].length < 0) {
             return res.status(401).send("Username or password is incorrect");
        }
        // console.log("b")
        // console.log(password)
        // console.log(user.rows[0])

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

router.get("/verify", async (req, res ) => {
  try {
    // console.log(req.query, process.env.jwtSecret)
    
    jwt.verify(req.query.token, process.env.jwtSecret, (err, user) => {
      console.log(err)
      if(err) return res.json(false)
    //   console.log("b")
    res.json(true)
      
      
  } )
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
}
})

router.post("/register", async(req,res) => {
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

export default router;