const Vendor = require("../models/VendorSchema");
const ErrorHandler = require("../utils/errorHandler");

//posting vendor data
exports.CreateVendor = async (req, res, next) => {
    try {
        const { name, description } = req.body;
    
        const vendor = await Vendor.create({ name, description  });
    
        res.status(200).json({
         success: true,
         message: "Vendor created successfully",
         vendor,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// geting all vendors 
exports.getAllVendors = async(req, res, next) =>{
    try {
      const data = await Vendor.find();

      res.status(500).json({success: true, data})
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}