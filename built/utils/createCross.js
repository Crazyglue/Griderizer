"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Jimp = require("jimp");
function createCross(tileDimensionsPixels) {
    return new Promise(function (resolve, reject) {
        new Jimp(tileDimensionsPixels.x, tileDimensionsPixels.y, Jimp.rgbaToInt(200, 200, 200, 1, function () { }), function (err, image) {
            if (err) {
                console.error(err);
                reject(err);
            }
            var crossColor = Jimp.rgbaToInt(0, 0, 0, 1, function () { });
            var halfWidth = Math.floor(tileDimensionsPixels.x / 2);
            var halfHeight = Math.floor(tileDimensionsPixels.y / 2);
            for (var y = 0; y < tileDimensionsPixels.y; y++) {
                var lastX = void 0;
                for (var x = 0; x < tileDimensionsPixels.x; x++) {
                    if (x < halfWidth + 2 && x > halfWidth - 2) {
                        image.setPixelColor(crossColor, x, y);
                    }
                    else if (y < halfHeight + 2 && y > halfHeight - 2) {
                        image.setPixelColor(crossColor, x, y);
                    }
                }
            }
            resolve(image);
        });
    });
}
exports.default = createCross;
//# sourceMappingURL=createCross.js.map