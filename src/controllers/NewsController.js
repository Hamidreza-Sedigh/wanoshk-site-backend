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
                const news = await News.find({}).sort({ date: -1 }).limit(10);
                if(news){
                    console.log("All News");
                    return res.json({ news })
                }    
            } catch (error) {
                console.log("ERROR in getNews:", error);
                return res.status(400).json({ message: 'we dont have any news yet'});
            }

    },

    async getMostVisitedDaily(req, res){
        try {
            const news = await News.find({"date":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).sort({ views: -1 }).limit(10);
            if(news){
                console.log("-getMostVisitedDaily");
                //console.log("news:", news);
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }
    },

    async getMostVisitedWeekly(req, res){
        try {
            const news = await News.find({"date":{$gt:new Date(Date.now() - 7 * 24*60*60 * 1000)}}).sort({ views: -1 }).limit(10);
            if(news){
                console.log("-getMostVisitedWeekly");
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }
    },

    async getMostCommentedDaily(req, res){
        try {
            const news = await News.find({}).sort({ date: -1 }).limit(10);
            if(news){
                console.log("-getMostCommentedDaily");
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }
    },

    async getMostCommentedweekly(req, res){
        try {
            const news = await News.find({}).sort({ date: -1 }).limit(10);
            if(news){
                console.log("-getMostCommentedweekly");
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
            console.log("****NEW TEST2", req.testVar);
            const news = await News.find({_id: req.params._id})
            if(news){
                console.log("-getOneNews");
                //news.view
                let viewsCount = news[0].views;
                viewsCount++;
                console.log("TEST viewCount:", viewsCount);
                news[0].views = viewsCount;
                await news[0].save();
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }

    },

    async getNewsTypes(req,res){
        try {
            console.log("param in getOneNews:", req.params);
            console.log("body  in getOneNews:", req.body);
            let categoryReq = req.body.type;
            let categoryRequested = '';
            console.log("categoryReq:", categoryReq);
            switch(categoryReq) {
                case 'a':
                    categoryRequested = 'سیاسی'
                    break;
                case 'b':
                    categoryRequested = 'اقتصادی'
                    break;
                case 'c':
                    categoryRequested = 'ورزشی'
                    break;
                case 'd':
                    categoryRequested = 'فناوری'
                    break;
                case 'e':
                    categoryRequested = 'اجتماعی'
                    break;
                case 'f':
                    categoryRequested = 'فرهنگی'
                    break;
                default:
                  // code block
            }
            console.log("categoryRequested:", categoryRequested);

            const news = await News.find({category:categoryRequested}).sort({ date: -1 }).limit(10);
            //console.log("find response:", news);
            if(news){
                console.log("-getNewsTypes");
                //news.view
                
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }

    },

    async getOneTypeNews(req, res){
        try {
            console.log("===getNewsTypes===");
            console.log("param in getOneNews:", req.params);
            console.log("body  in getOneNews:", req.body);
            let categoryReq = req.params.newsType;
            let categoryRequested = '';
            console.log("categoryReq:", categoryReq);
            switch(categoryReq) {
                case 'politic':
                    categoryRequested = 'سیاسی'
                    break;
                case 'finance':
                    categoryRequested = 'اقتصادی'
                    break;
                case 'sports':
                    categoryRequested = 'ورزشی'
                    break;
                case 'tech':
                    categoryRequested = 'فناوری'
                    break;
                case 'e':
                    categoryRequested = 'اجتماعی'
                    break;
                case 'f':
                    categoryRequested = 'فرهنگی'
                    break;
                default:
                  // code block
            }
            console.log("categoryRequested:", categoryRequested);

            const news = await News.find({category:categoryRequested}).sort({ date: -1 }).limit(100);
            if(news){
                console.log("-getOneTypeNews");
                //news.view
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }

    },

    
    async getOneSourceNews(req, res){
        try {
            console.log("===getNewsOneSource===");
            console.log("param in getOneNews:", req.params);
            console.log("body  in getOneNews:", req.body);
            let sourceReq = req.params.sourceName;
            console.log("sourceReq:", sourceReq);
            const news = await News.find({sourceName:sourceReq}).sort({ date: -1 }).limit(100);
            if(news){
                console.log("-getOneTypeNews");
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(400).json({ message: 'we dont have any news yet'});
        }
    },

    //new apis:
    async getFilteredNews(req, res){
        console.log("TEST CONTROLLER");
        console.log(req.query);

        const { category } = req.query;
      
        const filter = {};
        if (category) filter.category = category;
      
        try {
          const news = await News.find(filter).sort({ date: -1 }).limit(20);
          res.json(news);
        } catch (err) {
          res.status(500).json({ message: 'خطا در دریافت اخبار' });
        }
    },
    
    async getNewsDetails(req,res){
        
        const { id } = req.params;
        console.log("TEST : getNewsDetails");
        try {
            // const news = await News.find({_id: req.params._id})
            const newsItem = await News.findById(id);

            if (!newsItem) {
                return res.status(404).json({ message: 'خبر یافت نشد.' });
            }

            if (newsItem ) {
                console.log('-getOneNews');
                // افزایش بازدید فقط با یک درخواست
                await News.updateOne({ _id: newsItem._id }, { $inc: { views: 1 } });
              
                return res.json( newsItem );
              }

            // res.json(newsItem);
            // //todo:
            // let viewsCount = newsItem.views;
            // viewsCount++;
            // console.log("TEST viewCount:", viewsCount);
            // newsItem.views = viewsCount;
            // await newsItem.save();
            // res.json( newsItem )
                
        } catch (error) {
            console.log("ERROR in getNewsDetails:", error);
            return res.status(500).json({ message: 'we dont have any news yet'});
        }

    },

    async getLatestNews(req,res){

        try {
            const news = await News.find({}).sort({ date: -1 }).limit(50);
            if(news){
                return res.json({ news })
            }    
        } catch (error) {
            console.log("ERROR in getNews:", error);
            return res.status(500).json({ message: 'we dont have any news yet'});
        }

},

}