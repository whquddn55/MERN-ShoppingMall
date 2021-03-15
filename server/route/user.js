const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {Product} = require('../models/Product');
const auth = require('../middleware/auth');

router.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err) return res.json({ success : false, err});
        return res.status(200).json({ success : true, ...req.body});
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email : req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            res.json({loginSuccess : false, message : "가입 되지 않은 이메일 입니다. 다시 한 번 확인해 주세요."});
        } else {
            userInfo.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다."});
                } else {
                    userInfo.generateToken((err, userInfo) => {
                        if (err) return res.status(400).send(err);
                        res.cookie("x_auth", userInfo.token).status(200).json({ loginSuccess : true, 
                            id : userInfo._id});
                    });
                }
            })
        }
    });
});

router.get('/auth', auth, (req, res) => {
    res.status(200).json( {
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        role : req.user.role,
        image : req.user.image,
        cart : req.user.cart,
        hisotry : req.user.hisotry,
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, 
        { token : ""}, (err, user) => {
            if (err) return res.json({success : false, err});
            return res.status(200).json({
                success : true
            });
        });
});

router.post('/toCart', auth, (req, res) => {
    let include = false;
    req.user.cart.forEach(element => {
        if (element.productId === req.body.productId) {
            include = true;
        }
    });

    if (include === true) {
        User.findOneAndUpdate(
            {_id : req.user._id, "cart.productId" : req.body.productId}, 
            {$inc : {"cart.$.quantity" : 1}},
            {new : true}, // update된 결과값을 받아옴.
            (err, userInfo) => {
                if (err) return res.status(400).json({success : false, err});
                return res.status(200).send({success : true, cart : userInfo.cart});
            })
    } 
    else {
        User.findByIdAndUpdate(
            req.user._id,
            { $push : {
                cart: {
                    productId : req.body.productId,
                    quantity : 1,
                    date : Date.now()
                }
            }},
            {new : true},
            (err, userInfo) => {
                if (err) return res.status(400).json({success : false, err});
                return res.status(200).send({success : true, cart : userInfo.cart});
            }
        )
    }
})

module.exports = router;