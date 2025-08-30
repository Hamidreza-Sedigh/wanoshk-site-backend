const express =  require('express');
const mongoose = require('mongoose');
const cors =     require('cors');
const routes =   require('./routes');
const path =     require('path');
const http =     require('http');
//const socketio = require('socket.io')
const config = require('../config');
const News = require("./models/News");
const { generateSitemap } = require('./utils/sitemap');
const commentRoutes = require("./routes/commentRoutes");




//const Port = process.env.PORT || 8000;
  const Port = config.app.port;
const app =      express();
const server = http.Server(app);
//const io = socketio(server);  //old version
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "DELETE"]
	}
});



console.log("ENV:", config.env);
console.log("DB:", config.db.uri);
console.log("PORT:", config.app.port);







// if(process.env.NODE_ENV !== 'production' ){
//     require('dotenv').config()
// }

//console.log(process.env.MONGO_DB_CONNECTION);
try {
    //mongoose.connect(process.env.MONGO_DB_CONNECTION, {  // atlas
    //mongoose.connect("mongodb://localhost:27017/kahrobaDB", {  //localDB
      mongoose.connect(config.db.uri, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('MOngoDB connected...');
} catch (error) {
    console.log('!!!!!!ERROR DB NOT CONNECT');
    console.log(error);
}

// better useing reddis:
const connectUsers = {  };

io.on('connection', socket => {
    console.log('user is connected.', socket.id)
    console.log("server.js- io:", socket.handshake.query)
    const { user } = socket.handshake.query;

    connectUsers[user] = socket.id;
    
    //console.log('user is connected.', socket.id)
    // io.emit('hamid', {datoo: "hello-world"})
    socket.on('disconnect', () => {
        console.log('server.js-user disconnected');
      });
});

//sitemap:
app.get('/sitemap-news.xml', async (req, res) => {
    try {
      // اینجا دیتای اخبار رو از MongoDB بیار
      const newsList = await News.find({}, { shortId: 1, updatedAt: 1 });
      const sitemap = await generateSitemap('http://kahrobanet.ir', newsList);
      
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

// Middlewares
//app.use();
app.use((req, res, next)=> {
    req.io = io;
    req.connectUsers = connectUsers;
    req.conf = "tested!"
    return next();
});
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));// tell express to host files.
app.use(routes);
app.use("/api/comments", commentRoutes);

//app.listen(Port, ()=>{  // it was without socket
server.listen(Port, ()=>{   // with socket
    // console.log(`Listen on ${Port}`)
    console.log(`🚀 Server listening on port ${Port}`);
    
})