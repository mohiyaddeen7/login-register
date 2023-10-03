const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Users";

const connetToMongo = async () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("connected to MongoDB successfully");
    })
    .catch((err) => {
      console.log({
        error: `Error connecting to Database`,
        message: `${err.message}`,
      });
    });
};

module.exports = connetToMongo;
