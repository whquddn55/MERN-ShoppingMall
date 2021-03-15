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

router.get('/products', (req, res) => {
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const reqFilter = JSON.parse(req.query.filter);
    const term = reqFilter.term;
    let filter = {};
    for (let key in reqFilter)  {
        if (key === 'term')
            continue;
        if (Object.keys(reqFilter[key]).length > 0)
            filter[key] = reqFilter[key];
    }
    if (term) {
        Product.find(filter)
            .find({$text : {$search : term}})
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productsInfo) => {
                if (err) return res.status(400).json({success : false, err});
                return res.status(200).json({success : true, productsInfo})
            })
    }
    else {
        Product.find(filter)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productsInfo) => {
                if (err) return res.status(400).json({success : false, err});
                return res.status(200).json({success : true, productsInfo})
            })
    }
})

router.get('/products/:id', (req, res) => {
    const ids = req.params.id.split(',');
    console.log(ids);

    Product.find({_id : {$in : ids}})
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).json({success : false, err});
            return res.status(200).json({success : true, product});
        })
})

router.get('/:id', (req, res) => {
    Product.findOne({_id : req.params.id}, (err, productInfo) => {
        if (err) return res.status(400).json({success : false, err});
        return res.status(200).json({success : true, productInfo});
    })
})

module.exports = router;