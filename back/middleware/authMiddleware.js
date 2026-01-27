import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = async (id, req, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" })
    return token
}
export const protectedRoutees = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token" })
        }
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken
        next()

    } catch (error) {
        res.status(401).json({ message: "Invalid token!", err: error.message })
    }
}