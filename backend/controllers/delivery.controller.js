const Delivery = require("../models/delivery");

const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:3000');

exports.createDelivery = (req, res, next) => {

    const delivery = new Delivery({
        package_id: req.body.package_id,
        pickup_time: req.body.pickup_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: { 
            lat: req.body.location_lat,
            long: req.body.location_long,
        },
        status: req.body.status,
    }); 
    delivery
        .save()
        .then(result => {
            res.status(201).json({
                message: "Delivery added successfully",
                data: {
                    ...result,
                    delivery_id: result._id
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Delivery creation failed!"
            });
        });
};

exports.updateDelivery = (req, res, next) => {

    const delivery = new Delivery({
        _id: req.body.id,
        pickup_time: req.body.pickup_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: { 
            lat: req.body.location_lat,
            long: req.body.location_long,
        },
        status: req.body.status,        
    });
    // console.log(delivery);
    // console.log(req);
    Delivery
        .updateOne({ _id: req.params.id }, delivery)
        .then(result => {
            console.log(result);
            res.status(200).json({ 
                message: "Delivery updated successfully!",
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
            message: "Couldn't udpate the delivery !"
            });
      }); 
};

exports.getDeliveries = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;

    const query = Delivery.find();
    let fetched;  

    // In case of pagination
    if (pageSize && currentPage) {
        query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    query
        .then(documents => {
            fetched = documents;
            return Delivery.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Deliveries fetched successfully!",
                data: fetched,
                count: count
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching deliveries failed!"
            });
        });

    // socket test 
    // socket.send('Deliveries have been fetched');
    // socket.addEventListener('message', function(event) {
    //     console.log('Message from server =>> ', event.data);
    // });
};
  
exports.getDelivery = (req, res, next) => {
    Delivery.findById(req.params.id)
        .then(delivery => {
            if (delivery) {
                res.status(200).json(delivery);
            } else {
                res.status(404).json({ message: "Delivery not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching delivery failed!"
            });
        });
};
  
exports.deleteDelivery = (req, res, next) => {
    Delivery.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Deletion successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting delivery failed!"
            });
        });
};