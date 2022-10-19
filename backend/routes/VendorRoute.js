const express = require("express");
const { CreateVendor, getAllVendors } = require("../controllers/VendorController");
const router = express.Router();


router.post('/private/vendor', CreateVendor);
router.get('/private/vendors', getAllVendors);


module.exports = router;