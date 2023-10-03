const connectToMongo = require("./db.js");
const express = require("express");
const app = express();
const cors = require('cors')
const port = 5000;


//connection to database(MongoDB)
connectToMongo();


//to enable cross - origin requests
app.use(cors())
app.use(express.json());

//Available routes //middleware function - appllication level
app.use("/api/auth", require("./routes/auth.js"));

app.listen(port, () => {
  console.log(`inotebook app listening on  http://localhost:${port}`);
});
