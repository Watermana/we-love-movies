const req = require("express/lib/request");
const theatersService = require("./theaters.service");


async function list(req, res, next) {
    res.json({data: await theatersService.read()})
}

module.exports = {
    list,

}