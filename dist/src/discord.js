"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
var Ultimatum = /** @class */ (function (_super) {
    __extends(Ultimatum, _super);
    function Ultimatum() {
        var _this = _super.call(this) || this;
        _this.Commands = new discord_js_1.Collection();
        _this.Events = new discord_js_1.Collection();
        _this.client = new discord_js_1.Client({
            disableMentions: "all",
            fetchAllMembers: true,
        });
        return _this;
    }
    Ultimatum.prototype.run = function (config) {
        this.client.login();
        fs_1.readdir("./handler/commands", function (err, files) {
            err ? console.log(err) : false;
            files.forEach(function (f) {
                var cmdName = f.split(".")[0];
                var props = require("./handler/Commands/" + f);
            });
        });
    };
    return Ultimatum;
}(discord_js_1.Client));
exports.default = Ultimatum;
