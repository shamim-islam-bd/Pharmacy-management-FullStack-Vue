const express = require("express");
const { CreateVendor, getAllVendors, deleteVendor, updateVendor } = require("../controllers/VendorController");
const router = express.Router();


router.post('/private/vendor', CreateVendor);
router.get('/private/vendor', getAllVendors);
router.put('/private/vendor/:id', updateVendor);
router.delete('/private/vendor/:id', deleteVendor);


module.exports = router;