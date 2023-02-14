
import  express  from "express";
import { auth } from "../middleware/auth.js";
import { connectDatabase } from "../pool.js";


const router = express.Router();
const pool = connectDatabase();

router.get('/pigs', auth, async (req, res ) => {
    try {
      const pigs= await pool.query("SELECT * FROM pigs"
    );
  
    res.json(pigs.rows)
    } catch (error){
      console.log(error);
    }
    
  })
  
  router.post('/pigs', auth, async (req, res) => {
    try {
      const {name, sow, weight, type} = req.body
      console.log(req.body)
      const newPig = await pool.query ("INSERT INTO pigs (name, sow, weight, type) VALUES($1, $2, $3, $4)",[name, sow, weight, type])
      res.json("new Pig added")
      
    } catch (error) {
      console.log(error);
    }
  })
    
  router.post('/editPigs', auth, async (req, res ) => {
      try {
        const {weight, id, type} = req.body
        console.log(req.body)
        
        const editPigs= await pool.query("UPDATE pigs SET weight = $1,type = $3 WHERE id=$2",[
          weight, id, type
        ])
      
        res.json("pigs have been edited")
      } catch (error) {
        console.log(error)
      }
    });
  
  router.delete('/pigs/:id', auth, async (req, res) => {
    try {
      const {id} = req.params;
      console.log(req.params)
      const deletePig = await pool.query ("DELETE FROM pigs WHERE id=$1",[id]);
      res.json("Pig was deleted");
        
    } catch (error) {
      console.log(error);
    }
    })

    export default router