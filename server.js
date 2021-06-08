const { createServer } = require("http");
const app = require("./app");

const server = createServer(app);

const { LOCAL_PORT, PORT } = process.env;
const port = PORT || LOCAL_PORT;
server.listen(port, function () {
  console.log("we're up and running on PORT >>>", port);
});
