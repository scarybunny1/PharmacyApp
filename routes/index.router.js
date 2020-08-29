const express = require('express');
const router = express.Router();
const jwtVerify = require('../config/jwtHelper');
// const multer = require('multer');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('user');

// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, `images/`)
//   },
//   filename: (req, file, callBack) => {
//       callBack(null, `${file.originalname}`)
//   }
// })

// const upload = multer({ storage: storage });

router.post('/register', (req, res)=>{
    user = new User({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        prevHist: req.body.prevHist,
        med1: req.body.med1,
        med2: req.body.med2,
        med3: req.body.med3,
        med4: req.body.med4,
        med5: req.body.med5,
        image: req.body.image
    })
    user.save(()=>{
        res.json(user)
    })
});

router.post('/login', (req, res, next)=> {
    passport.authenticate('local', (err, user, info)=> {
        if (err)
            return res.status(400).json(err);
        else if(user)
            return res.status(200).json({'token': user.generateJwt()});
        else
            return res.status(404).json(info);
    })(req,res);
});

router.get('/user-details', jwtVerify.verifyJwtToken, (req, res, next) => {
    User.findOne({ username: req.username}, (err, user)=>{
        if(!user)
            return res.status(404).json({status: false, message: 'User record not found'});
        else
            return res.status(200).json({status: true, user: user });
    })
})

// router.post('/image-upload', upload.single('image'), (req, res, next) => {
//   const image = req.image;
  
//   if (!image) {
//     const error = new Error('No Image')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send({status:  'ok'});
// })


// router.get('/getfile/:name', (req, res)=>{
//   res.sendFile(__dirname+'/uploads/'+req.params.name)
// })

module.exports = router;
