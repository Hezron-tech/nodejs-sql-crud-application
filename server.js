const express =require("express");
const cors = require("cors");

const app = express();


var corsOptions ={
    origin: "http://localhost:8081"
};

app.use (cors(corsOptions));

app.use (express.json());

app.use(express.urlencoded({extended:true}));

const db = require("./app/models");
db.sequelize.sync();

db.sequelize({force:true}).then(()=>{
    console.log("Drop and re-sync db");
});


//simple route

app.get("/", (req, res) =>{
    res.json({message:"welcome to Hezron application."});
} );

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT||8081;

app.listen (PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});


