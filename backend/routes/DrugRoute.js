const express = require("express");
const { CreateDrug, getAllDrugs, deleteDrug, updateDrug } = require("../controllers/DrugController");
const router = express.Router();


router.post('/private/drug', CreateDrug);
router.get('/private/drug', getAllDrugs);
router.put('/private/drug/:id', updateDrug);
router.delete('/private/drug/:id', deleteDrug);


module.exports = router;