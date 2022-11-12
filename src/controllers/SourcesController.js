const Source = require('../models/Source');
const jwt =      require('jsonwebtoken');

module.exports = {
    
    
    async getAllSources(req,res){

            try {
                //const sources = await Source.distinct("sourceName");
                //const sources = await Source.find({}).distinct('_id', function(error, ids){});
                //const sources = await Source.find({}).distinct('sourceName');
                const sources = await Source.find({});
                if(sources){
                    console.log("All sources", sources);
                    return res.json({ sources })
                }    
            } catch (error) {
                console.log("ERROR in getAllSources:", error);
                return res.status(400).json({ message: 'we dont have any sources yet'});
            }

    }


}