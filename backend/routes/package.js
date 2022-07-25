const express = require("express");
const PackageController = require("../controllers/package.controller");
const router = express.Router();

router.post("",  PackageController.createPackage);

router.put("/:id", PackageController.updatePackage);

router.get("", PackageController.getPackages);

router.get("/:id", PackageController.getPackage);
                                                                                                                                                                                                                                                    
router.delete("/:id", PackageController.deletePackage);

module.exports = router;
