const { default: mongoose } = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

const connectToDbAtlas = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING, options);
  mongoose.connection
    .once("open", () => {
      console.log("connected to db");
    })
    .on("error", (error) => {
      console.log(error);
    });
};

module.exports = { connectToDbAtlas };
