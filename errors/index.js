const authError = require("./authError");
const customError = require("./createCustomError");
const badRequest = require('./badRequest')
const notFound = require('./notFound')
module.exports = {
    authError,
    customError,
    badRequest,
    notFound
}