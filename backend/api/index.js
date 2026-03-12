const serverless = require("serverless-http");
const app = require("../src/app").default;

const handler = serverless(app);
module.exports = handler;