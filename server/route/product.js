const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname.split('.')[0]}_${Date.now()}.${file.originalname.split('.')[1]}`)
    }
  })
   
let upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
    upload(req, res, err => {
        if (err) return res.status(400).json({success : false, err});
        return res.status(200).json({success: true, filePath: req.file.path, fileName: req.file.filename})
    })
});

router.post('/', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save(err => {
        if (err) return res.status(400).json({success : false, err});
        return res.status(200).json({success : true});
    })
});

router.post('/products', (req, res) => {
    const limit = req.body.limit ? parseInt(req.body.limit) : 100;
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let filter = {};
    for (let key in req.body.filter)  {
        if (Object.keys(req.body.filter[key]).length > 0)
            filter[key] = req.body.filter[key];
    }
    console.log(filter);
    Product.find(filter)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productsInfo) => {
                if (err) return res.status(400).json({success : false, err});
                return res.status(200).json({success : true, productsInfo})
            })
})



module.exports = router;