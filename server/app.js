
import { connectDatabase } from "./pool.js"
import  express  from "express";
import cors from "cors"
import feedRoute from "./routes/feeds.js";
import jwtAuthRoute from "./routes/jwtAuth.js";
import medicinesRoute from "./routes/medicines.js";
import pigsRoute from "./routes/pigs.js";
import profileRoutes from "./routes/profile.js";



const app = express()
const pool = connectDatabase()
const PORT = 8000

app.use(express.json());
app.use(cors());
app.use('/api',feedRoute)
app.use('/api',jwtAuthRoute)
app.use('/api', medicinesRoute)
app.use('/api',pigsRoute)
app.use('/api',profileRoutes)

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




