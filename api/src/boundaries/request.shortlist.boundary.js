const express = require('express')
const router = express.Router();

const {
    GetAllShortlistController,
    AddShortlistController,
    SearchShortlistController
} = require("../controllers/reqeust.shortlist.controller");

router.get("/getAllShortlist/:userId", async (req, res) => {
    try{
        const { userId } = req.params;

        const controller = new GetAllShortlistController();
        const result = await controller.getAllShortlist(userId);

        if (!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (e){
        console.error(e);
        return res.status(500).json({
            success: false,
            data: null
        })
    }
});

router.post("/addShortlist", async (req, res) => {
    try{
        const { csrUserId, shortlist } = req.body;

        const controller = new AddShortlistController();
        const result = await controller.addShortlist(csrUserId, shortlist);

        if (!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    }
    catch (e){
        console.error(e);
        return res.status(500).json({
            success: false,
            data: null
        })
    }
});

router.get("/searchShortlist/", async (req, res) => {
    try{
        const { searchQuery, userId } = req.query;

        const controller = new SearchShortlistController();
        const result = await controller.searchShortlist(searchQuery, userId);

        if(!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (e){
        console.error(e);
        return res.status(500).json({
            success: false,
            data: null
        })
    }
})


module.exports = router;