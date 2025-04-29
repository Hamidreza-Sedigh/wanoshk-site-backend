const Registration = require('../models/Registration');
//const { create } = require('../models/Registration');
const jwt = require('jsonwebtoken');

module.exports = {
    create(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                //const { user_id } = req.headers;
                const user_id = authData.user._id;
                const { eventId } = req.params;
                const { date } = req.body;
                
                console.log("RegistrationContPage:");
                console.log("user_id:", user_id, "eventId", eventId, "date:", date);
                const registration = await Registration.create({
                    user: user_id,
                    event: eventId
                   // date
                });

                console.log("registration:", registration);

                const populatedRegistration = await Registration.findById(registration._id)
                    .populate('event')
                    .populate('user', '-password') ;
                console.log("populatedRegistration:", populatedRegistration);

                //old code:
                // await registration
                //     .populate('event')
                //     .populate('user', '-password') 
                //     .execPopulate();
                    


                    // .execPopulate((err, doc) => {
                    //     if (err) { return console.error("ERROR in popu", err); }
                    //     console.log(doc);
                    //     return conn.close();
                    // });

                              // it  means avoid pass
                //await registration
                // .pop returs error I dont know why
                // without populate it has just the user_id and event_id
                //populatedRegistration
                // registration.owner = registration.event.user;
                // registration.eventTitle = registration.event.title;
                // registration.eventPrice = registration.event.price;
                // registration.eventDate = registration.event.date;
                // registration.userEmail = registration.user.email;
                // registration.save();



                registration.owner = populatedRegistration.event.user;
                registration.eventTitle = populatedRegistration.event.title;
                registration.eventPrice = populatedRegistration.event.price;
                registration.eventDate = populatedRegistration.event.date;
                registration.userEmail = populatedRegistration.user.email;
                registration.save();
                
                console.log("registrationAfterSave:", registration);
    
                const ownerSocket = req.connectUsers[populatedRegistration.event.user];
                // const ownerSocket = req.connectUsers['67f7bd2d83430bb44a537913'];
                    
                if(ownerSocket) {
                    req.io.to(ownerSocket).emit('registration_request', registration)
                    //req.io.to(ownerSocket).emit('registration_request', 'some test')
                }

                return res.json(registration);    
            }
        });
    },

    async getRegistration(req, res){
        const {registration_id } = req.params;

        try {
            const registration = await Registration.findById(registration_id);
            await registration
                .populate('event')
                .populate('user', '-password') // it  means avoid pass
                .execPopulate();

            return res.json(registration);
        } catch (error) {
            return res.status(400).json({message: "Registration not found."});
        }

    },

    async getMyRegistrations(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                try {
                    const registrationArr = await Registration.find({"owner": authData.user._id})
                    if(registrationArr){
                        return res.json(registrationArr)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
}