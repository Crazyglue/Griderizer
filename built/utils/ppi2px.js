"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convert(ppi, mm) {
    try {
        var tileDimensionsInches = mm / 25.4;
        var tileDimensionsPixels = {
            x: Math.floor(ppi * tileDimensionsInches),
            y: Math.floor(ppi * tileDimensionsInches)
        };
        return tileDimensionsPixels;
    }
    catch (e) {
        console.error(e);
        throw new Error(e);
    }
}
exports.default = convert;
//# sourceMappingURL=ppi2px.js.map