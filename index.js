const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Hit!",
  });
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
