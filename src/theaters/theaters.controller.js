const req = require("express/lib/request");
const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function theaterExists(req, res, next) {

}

async function list(req, res, next) {
    res.json({data: await theatersService.read()})
}

async function read(req, res, next) {

}

module.exports = {
    read: [asyncErrorBoundary(theaterExists), read],
    list,

}