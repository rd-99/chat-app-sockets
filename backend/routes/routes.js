import express from 'express';
const router = express.Router();
import { users } from '../config/users';
router.get('/login', (req, res) => {
    /// non-secure login
    const {username, password} = req.body;
    const user = users.find(user => user.username === username);
    if(user && user.password === password){
        res.status(200).json({
            username: user.username,
            email: user.email
        })
        return
    }
    res.status(401).json({message: "Invalid username or password"})
})



export default router;