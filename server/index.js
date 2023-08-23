const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const menuRouter = require("./routers/menu");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(menuRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
