const config=require("../config/config.json")
const {Sequelize}=require("sequelize");

const database = new Sequelize(config.db);
database 
.authenticate()
.then(()=>{
    console.log("database connected")
})
.catch((error) => {
    console.log("database connected error")
})
module.exports=database;