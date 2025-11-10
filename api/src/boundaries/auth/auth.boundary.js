const express = require('express');
const router = express.Router();
const AuthLoginController = require('../../controllers/auth/auth.login.controller.js');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        if (!username || !password){
            return res.status(400).json({
                success : false,
                message : 'Username and password are required.'
            });
        }
        
        const controller = new AuthLoginController();
        const result = await controller.login(username, password);
        return res.status(200).json({
            success : true,
            data: result
        });
    }
    catch (error){
        console.error(error)
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
})

module.exports = router;