const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
    // _id will be formated in front end as deliveryId
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    pickup_time: { type: Date},
    start_time: { type: Date },
    end_time: { type: Date },
    location: { 
        lat: { type: mongoose.Schema.Types.Decimal128, required: true },
        long: { type: mongoose.Schema.Types.Decimal128, required: true },
    },
    status: { type: String, required: true },
});

deliverySchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.location.lat = ret.location ? ret.location.lat.toString() : '';
        ret.location.long = ret.location ? ret.location.long.toString() : '';
        return ret;
    },
});
 
module.exports = mongoose.model("Delivery", deliverySchema);
