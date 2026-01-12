import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = async (id, req, res, next) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token
}
// export const protectedRoutees = ()=>{
//     const 
// }