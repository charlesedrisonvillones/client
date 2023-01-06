import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const auth = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(403).json( {
            err: 'Invalid token'
        })
    }

    try {
        jwt.verify(token, process.env.jwtSecret, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
       
            next()
        } )
    } catch (error) {
        res.status(401).json({ error: err.message });
    }
}
export { auth }