"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataFile = (function () {
    function DataFile(data) {
        this.buffers = [];
        this.pos = 0;
        this.size = 0;
        if (data) {
            this.buffers.push(data);
            this.size = data.byteLength;
            this.pos = 0;
        }
    }
    DataFile.prototype.read = function (size) {
        this.flatten();
        if (size + this.pos > this.size) {
            // size = this.size - this.pos;
            return null;
        }
        var oldPos = this.pos;
        this.pos += size;
        // return this.buffers[0].subarray(oldPos, this.pos);
        return this.buffers[0].slice(oldPos, this.pos);
    };
    DataFile.prototype.readAll = function () {
        this.flatten();
        return this.buffers[0];
    };
    DataFile.prototype.write = function (data) {
        this.buffers.push(data);
        this.size += data.byteLength;
        this.pos += data.byteLength;
        return true;
    };
    DataFile.prototype.tell = function () {
        return this.pos;
    };
    DataFile.prototype.seek = function (pos, method) {
        var newPos = this.pos;
        if (method === "SET") {
            newPos = pos;
        }
        else if (method === "CUR") {
            newPos += pos;
        }
        else {
            newPos = this.size - pos;
        }
        if (newPos < 0 || newPos > this.size) {
            return false;
        }
        this.pos = newPos;
        return true;
    };
    DataFile.prototype.flatten = function () {
        if (this.buffers.length <= 1) {
            return;
        }
        var newBuffer = new Uint8Array(this.size);
        var offset = 0;
        for (var _i = 0, _a = this.buffers; _i < _a.length; _i++) {
            var buffer = _a[_i];
            newBuffer.set(buffer, offset);
            offset += buffer.byteLength;
        }
        this.buffers = [newBuffer];
    };
    return DataFile;
}());
exports.DataFile = DataFile;
