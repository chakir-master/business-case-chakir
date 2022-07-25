const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
    // _id will be formatted in front as packageId
    active_delivery_id: { type: String, default: '' },
    description: { type: String, required: true },
    weight: { type: mongoose.Schema.Types.Decimal128, required: true },
    width: { type: mongoose.Schema.Types.Decimal128, required: true },
    height: { type: mongoose.Schema.Types.Decimal128, required: true },
    depth: { type: mongoose.Schema.Types.Decimal128, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: { 
        lat: { type: mongoose.Schema.Types.Decimal128, required: true },
        long: { type: mongoose.Schema.Types.Decimal128, required: true },
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: { 
        lat: { type: mongoose.Schema.Types.Decimal128, required: true },
        long: { type: mongoose.Schema.Types.Decimal128, required: true },
    },
});

packageSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.weight = ret.weight.toString();
        ret.width = ret.width.toString();
        ret.height = ret.height.toString();
        ret.depth = ret.depth.toString();
        ret.from_location.lat = ret.from_location.lat.toString();
        ret.from_location.long = ret.from_location.long.toString();
        ret.to_location.lat = ret.to_location.lat.toString();
        ret.to_location.long = ret.to_location.long.toString();
        return ret;
    },
});

module.exports = mongoose.model("Package", packageSchema);
