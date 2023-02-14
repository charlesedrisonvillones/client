
import  express  from "express";
import { auth } from "../middleware/auth.js";



const router = express.Router();


router.get('/profile', auth, async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      console.log(error);
    }
  })

  export default router