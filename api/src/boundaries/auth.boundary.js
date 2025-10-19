const express = require('express');
const router = express.Router();
const authLoginController = require('../controllers/auth.login.controller');
const authLogoutController = require('../controllers/auth.logout.controller');

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
        
        const result = await authLoginController.login(username, password);
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

router.post('/logout', async (req, res) => {
    try{
        const result = await authLogoutController.logout()
        return res.status(200).json({
            success : true,
            data: result
        });
    }
    catch (error){
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
})