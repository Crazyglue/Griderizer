"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Jimp = require("jimp");
var index_1 = require("./index");
var inquirer = require('inquirer');
var fs = require('fs');
var questions = [
    {
        type: 'input',
        name: 'inputFolder',
        message: "Input folder",
        default: 'input'
    },
    {
        type: 'input',
        name: 'outputFolder',
        message: "output folder",
        default: 'output'
    },
    {
        type: 'input',
        name: 'columns',
        message: 'Columns (width)',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 7
    },
    {
        type: 'input',
        name: 'rows',
        message: 'Rows (height)',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 5
    },
    {
        type: 'input',
        name: 'ppi',
        message: 'PPI',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 300
    },
    {
        type: 'input',
        name: 'diameterMM',
        message: 'Jewel Diameter (mm)',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 80
    }
];
inquirer.prompt(questions).then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    var customImage, coverImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, index_1.shapeImage('https://wow.zamimg.com/images/logos/special/wod/hometitle.png', index_1.ppi2px(300, 80))];
            case 1:
                customImage = _a.sent();
                customImage.write('./output/wowhead_shaped.png');
                return [4, Jimp.read('https://wow.zamimg.com/images/logos/special/wod/hometitle.png')];
            case 2:
                coverImage = _a.sent();
                coverImage.cover(400, 400).write('./output/wowhead_covered.png');
                return [2];
        }
    });
}); }).catch(function (err) {
    console.log('questionErr', err);
});
//# sourceMappingURL=demo.js.map