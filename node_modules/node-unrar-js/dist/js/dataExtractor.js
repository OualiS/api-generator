"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dataFile_1 = require("./dataFile");
var extractor_1 = require("./extractor");
var unrar = require("./unrar");
var DataExtractor = (function (_super) {
    __extends(DataExtractor, _super);
    function DataExtractor(data, password) {
        var _this = _super.call(this, password) || this;
        _this.dataFiles = {};
        _this.dataFileMap = {};
        _this.currentFd = 1;
        var rarFile = {
            file: new dataFile_1.DataFile(new Uint8Array(data)),
            fd: _this.currentFd++,
        };
        _this._filePath = "_defaultUnrarJS_.rar";
        _this.dataFiles[_this._filePath] = rarFile;
        _this.dataFileMap[rarFile.fd] = _this._filePath;
        return _this;
    }
    DataExtractor.prototype.open = function (filename) {
        var dataFile = this.dataFiles[filename];
        if (!dataFile) {
            return 0;
        }
        return dataFile.fd;
    };
    DataExtractor.prototype.create = function (filename) {
        var fd = this.currentFd++;
        this.dataFiles[filename] = {
            file: new dataFile_1.DataFile(),
            fd: this.currentFd++,
        };
        this.dataFileMap[fd] = filename;
        return fd;
    };
    DataExtractor.prototype.closeFile = function (fd) {
        var fileData = this.dataFiles[this.dataFileMap[fd]];
        if (!fileData) {
            return null;
        }
        var ret = fileData.file.readAll();
        if (fd !== 1) {
            delete this.dataFiles[this.dataFileMap[fd]];
            delete this.dataFileMap[fd];
        }
        else {
            fileData.file.seek(0, "SET");
        }
        return ret;
    };
    DataExtractor.prototype.read = function (fd, buf, size) {
        var fileData = this.dataFiles[this.dataFileMap[fd]];
        if (!fileData) {
            return -1;
        }
        var data = fileData.file.read(size);
        if (data === null) {
            return -1;
        }
        unrar.HEAPU8.set(data, buf);
        return data.byteLength;
    };
    DataExtractor.prototype.write = function (fd, buf, size) {
        var fileData = this.dataFiles[this.dataFileMap[fd]];
        if (!fileData) {
            return false;
        }
        fileData.file.write(unrar.HEAPU8.slice(buf, buf + size));
        return true;
    };
    DataExtractor.prototype.tell = function (fd) {
        var fileData = this.dataFiles[this.dataFileMap[fd]];
        if (!fileData) {
            return -1;
        }
        return fileData.file.tell();
    };
    DataExtractor.prototype.seek = function (fd, pos, method) {
        var fileData = this.dataFiles[this.dataFileMap[fd]];
        if (!fileData) {
            return false;
        }
        return fileData.file.seek(pos, method);
    };
    return DataExtractor;
}(extractor_1.Extractor));
exports.DataExtractor = DataExtractor;
