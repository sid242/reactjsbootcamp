const express = require("express");
require("./db")
const app = express();
var cors = require('cors')
const port = 5000;

app.use(cors())
app.use(express.json())

// app.get("/" , (req, res) => {
//     res.send("hello")
// })
// app.use(express.static(__dirname)); 

app.use("/api/auth" , require("./routes/auth"))
app.use("/api/notes" , require("./routes/notes"))


app.listen(port, () => {
    console.log(`listening at port no ${port}`);
})