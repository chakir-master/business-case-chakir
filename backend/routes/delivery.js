const express = require("express");
const DeliveryController = require("../controllers/delivery.controller");
const router = express.Router();

router.post("",  DeliveryController.createDelivery);

router.put("/:id", DeliveryController.updateDelivery);

router.get("", DeliveryController.getDeliveries);

router.get("/:id", DeliveryController.getDelivery);
                                                                                                                                                                                                                       
router.delete("/:id", DeliveryController.deleteDelivery);

module.exports = router;
