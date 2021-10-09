"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataExtractor_1 = require("./dataExtractor");
var fileExtractor_1 = require("./fileExtractor");
function createExtractorFromData(data, password) {
    if (password === void 0) { password = ""; }
    return new dataExtractor_1.DataExtractor(data, password);
}
exports.createExtractorFromData = createExtractorFromData;
function createExtractorFromFile(filepath, targetPath, password) {
    if (targetPath === void 0) { targetPath = ""; }
    if (password === void 0) { password = ""; }
    return new fileExtractor_1.FileExtractor(filepath, targetPath, password);
}
exports.createExtractorFromFile = createExtractorFromFile;
