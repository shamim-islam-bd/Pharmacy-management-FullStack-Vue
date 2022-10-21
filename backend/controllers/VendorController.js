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
      const vendorData = await Vendor.find();

      res.status(201).json({
         success: true,
         vendorData
        })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


// delete vendor
exports.deleteVendor = async(req, res, next) =>{
    try {
      const vendorData = await Vendor.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true, 
        message: "Vendor deleted successfully",
        vendorData
    })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// update vendor
exports.updateVendor = async(req, res, next) =>{
    try {
      const vendorData = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
      });

      res.status(201).json({
         success: true,
         message: "Vendor updated successfully",
         vendorData
        })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}