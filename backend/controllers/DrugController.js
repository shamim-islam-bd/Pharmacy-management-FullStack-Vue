const Drug = require("../models/DrugSchema");
const ErrorHandler = require("../utils/errorHandler");

//posting Drug data
exports.CreateDrug = async (req, res, next) => {
    try {
        const { name, type, vendor, price, quantity } = req.body;
    
        const CreateDrug = await Drug.create({ name, type, vendor, price, quantity });
    
        res.status(200).json({
         success: true,
         message: "Drug created successfully",
         CreateDrug,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// geting all vendors 
exports.getAllDrugs = async(req, res, next) =>{
    try {
      const vendorData = await Drug.find();

      res.status(201).json({
         success: true,
         vendorData
        })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


// delete vendor
exports.deleteDrug = async(req, res, next) =>{
    try {
      const vendorData = await Drug.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true, 
        message: "Drug deleted successfully",
        vendorData
    })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// update vendor
exports.updateDrug = async(req, res, next) =>{
    try {
      const vendorData = await Drug.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
      });

      res.status(201).json({
         success: true,
         message: "Drug updated successfully",
         vendorData
        })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}