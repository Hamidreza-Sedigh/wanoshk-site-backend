// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt    = require('jsonwebtoken');
// controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
};

// module.exports = {
//     async createUser(req, res){
//         try {
//             console.log(req.body);
//             const {firstName, lastName, username, password, email} = req.body;

//             const existenUser = await User.findOne({email});

//             if(!existenUser){
//                 const hashedPassword = await bcrypt.hash(password, 10);
//                 const userResponse = await User.create({
//                     firstName,
//                     lastName,
//                     password: hashedPassword,
//                     email
//                 });

//                 return jwt.sign({user: userResponse}, 'secret', (err, token)=>{
//                     return res.json({
//                         user: token,
//                         user_id: userResponse._id
//                     })
//                 })

//                 // bedoone JWT object ersal mishavad:
//                 // return res.json({
//                 //     _id: user._id,
//                 //     email: user.email,
//                 //     firstName: user.firstName,
//                 //     lastName: user.lastName
//                 // });    
//             } else {
//                 return res.status(400).json({
//                     message: "email/user already exist! Do you want to login"
//                 });
//             }


//         } catch (error) {
//             throw Error(`Error while registering new user: ${error}`)
//         }
//     },

//     async getUserById(req, res){
//         //const userId = req.params.userId;  // me
//         const {userId} = req.params;  // jean
//         console.log("req:::", req.params);
//         try {
//             const user = await User.findById(userId);
//             return res.json(user)
//         } catch (error) {
//             return res.status(400).json({
//                 message: "user Id does not exist! Do you want to register"
//             });
            
//         }
//     }
// }