const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt =      require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // new


module.exports = {
    async store(req, res){

        try {
            const {email, password} = req.body
            console.log("routes OK!", email, password)
            if (!email || !password){
                return res.status(200).json({message: "Rquired field missing"});
            }

            const user = await User.findOne({email})
            if(!user){
                console.log("test: if not user");
                return res.status(200).json({message: "User not found. want to register?"});
            }

            if(user && await bcrypt.compare(password, user.password)){
                console.log("test2: ok login");
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

                // return res.json(userResponse); // whitout jwt
                
                return jwt.sign({user: userResponse}, 'secret', (err, token)=>{
                    return res.json({
                        user: token,
                        user_id: userResponse._id
                    })
                } )
            }else{
                console.log("test2: wrong pass");
                return res.status(200).json({message: "email or pass does not match"});
            }

        } catch (error) {
            throw Error(`Error while authenticating a user ${error}`);// it has error
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

        res.json({ token });
        } catch (err) {
        res.status(500).json({ error: 'Server error during login' });
        }
    }
}