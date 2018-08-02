var express = require("express");
var axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/verifyPsOnlineId", async (req, res) => {
  var body = req.body;
  let response = "";
  console.log(req.body);
  try {
    response = await axios.post(
      "https://accounts.sp-int.api.playstation.com/api/v1/accounts/onlineIds",
      body
    );
    // console.log(response.data);
    res.status(201).send("-1");
  } catch (e) {
    console.log(e.response.status);
    const resCode = e.response.data[0].code;
    if (resCode === "3101") {
      return res.status(200).send("1");
    } else {
      return res.status(200).send("-1");
    }
  }
});

module.exports = router;
