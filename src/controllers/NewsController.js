const News = require('../models/News');
const jwt =      require('jsonwebtoken');

module.exports = {
    
    getAllNews1(req,res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                console.log("ERROR in getallNews");
                res.sendStatus(401);
            } else {
                const { sport } = req.params;
                const query = sport ? {sport} : {}
                try {
                    const news = await News.find({})
                    if(news){
                        return res.json({authData, news})
                    }    
                } catch (error) {
                    return res.status(400).json({ message: 'we dont have any news yet'});
                }
            }
        });
    },

    async getAllNews(req,res){

            try {
                const news = await News.find({})
                if(news){
                    console.log("if OK!!!!");
                    return res.json({ news })
                }    
            } catch (error) {
                console.log("ERROR in getNews:", error);
                return res.status(400).json({ message: 'we dont have any news yet'});
            }

    },

    //getOneNews
    async getOneNews(req,res){
        try {
            console.log("param in getOneNews:", req.params);
            console.log("param in getOneNews:", req.params._id);
            const { news_id } = req.params;
            console.log("TEST1:", news_id)
            const news = await News.find({_id: req.params._id})
            if(news){
                console.log("if OK!!!!");
                //news.view
                let viewsCount = news[0].views;
                viewsCount++;
                console.log("TEST:", viewsCount);
                news[0].views = viewsCount;
                await news[0].save();
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }

}

}