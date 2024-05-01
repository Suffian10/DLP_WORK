var mongoose = require("mongoose");
mongoose.connect(
  // "mongodb+srv://msuffiansoomro:suffian10.@abc.vlrxshe.mongodb.net/?retryWrites=true&w=majority&appName=ABC",
  "mongodb+srv://msuffiansoomro:admin1234@abc-00.xqjfglz.mongodb.net/?retryWrites=true&w=majority&appName=abc-00",

  // mongodb+srv://msuffiansoomro:suffian10.@abc-00.xqjfglz.mongodb.net/?retryWrites=true&w=majority&appName=abc-00
  { useNewUrlParser: true }
);

module.exports = mongoose;

// mongodb+srv://msuffiansoomro:<password>@abc.vlrxshe.mongodb.net/
