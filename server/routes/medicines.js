
import  express  from "express";
import { auth } from "../middleware/auth.js";

import { connectDatabase } from "../pool.js";


const router = express.Router();
const pool = connectDatabase();

router.get('/medicines', auth, async (req, res ) => {
    try {
      const medicines= await pool.query("SELECT * FROM medicines"
            );
          
      res.json(medicines.rows)
      } catch (error){
      console.log(error);
          }
            
          })
  
  router.post('/editMedicines', auth, async (req, res) => {
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
      
  router.post('/medicines', auth, async (req, res) => {
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
  
  router.delete('/medicines/:name_id', auth, async (req, res) => {
    try {
      const {name_id} = req.params;
      const deleteFeed = await pool.query ("DELETE FROM medicines WHERE name_id=$1",[name_id]);
      res.json("Medicine was deleted")
                    
      } catch (error) {
      console.log(error);
          }
          })
  
  export default router