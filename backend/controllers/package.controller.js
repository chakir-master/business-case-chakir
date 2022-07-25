const Package = require("../models/package");


exports.createPackage = (req, res, next) => {

    const package = new Package({
        active_delivery_id: req.body.active_delivery_id,
        description: req.body.description,
        weight: req.body.weight,
        width: req.body.width,
        height: req.body.height,
        depth: req.body.depth,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
        from_location: { 
            lat: req.body.from_location_lat,
            long: req.body.from_location_long,
        },
        to_name: req.body.to_name,
        to_address: req.body.to_address,
        to_location: { 
            lat: req.body.to_location_lat,
            long: req.body.to_location_long,
        },
    }); 
    // console.log("Package object ::: " + package);
    package
        .save()
        .then(result => {
            res.status(201).json({
                message: "Package added successfully",
                data: {
                    ...result,
                    package_id: result._id
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Package creation failed!"
            });
        });
};

exports.updatePackage = (req, res, next) => {
    console.log('HEre for update');
    const package = new Package({
        _id: req.body.id,
        active_delivery_id: req.body.active_delivery_id,
        description: req.body.description,
        weight: req.body.weight,
        width: req.body.width,
        height: req.body.height,
        depth: req.body.depth,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
        from_location: { 
            lat: req.body.from_location_lat,
            long: req.body.from_location_long,
        },
        to_name: req.body.to_name,
        to_address: req.body.to_address,
        to_location: { 
            lat: req.body.to_location_lat,
            long: req.body.to_location_long,
        },
    });
    // console.log(package);

    Package 
        .updateOne({ _id: req.params.id }, package)
        .then(result => {
            console.log(result);
            res.status(200).json({ 
                message: "Package updated successfully!",
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
            message: "Couldn't udpate the package !"
            });
      });
};

exports.getPackages = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;

    const query = Package.find();
    let fetched; 

    // In case of pagination
    if (pageSize && currentPage) {
        query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    query
        .then(documents => {
            fetched = documents;
            // console.log(fetched);
            return Package.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Packages fetched successfully!",
                data: fetched,
                count: count
            });
        })
        .catch(error => {
        res.status(500).json({
            message: "Fetching packages failed!"
        });
        });
};
  
exports.getPackage = (req, res, next) => {
    Package.findById(req.params.id)
        .then(package => {
            if (package) {
                res.status(200).json(package);
            } else {
                res.status(404).json({ message: "Package not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching package failed!"
            });
        });
};
  
exports.deletePackage = (req, res, next) => {
    Package.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Deletion successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting package failed!"
            });
        });
}; 