var Jimp = require("jimp");

function createCross(tileDimensionsPixels) {
    var crossImage = new Jimp(tileDimensionsPixels.x, tileDimensionsPixels.y, Jimp.rgbaToInt(255, 255, 0, 1), (err, image) => {
        if (err) throw err;
        const crossColor = Jimp.rgbaToInt(0, 0, 255, 1);

        image.scaleToFit(tileDimensionsPixels.x, tileDimensionsPixels.x)

        for(var y = 0; y < tileDimensionsPixels.y; y++) {
            let lastX;
            for(var x = 0; x < tileDimensionsPixels.x; x++) {
                if (x === y) {
                    image.setPixelColor(crossColor, x, y);
                    lastX = x;
                } else if (x === tileDimensionsPixels.x - lastX) {
                    image.setPixelColor(crossColor, x, y);
                    lastX = 0;
                } else if (y > x && x + y === tileDimensionsPixels.x) {
                    image.setPixelColor(crossColor, x, y);
                    lastX = 0;
                }
            }
        }
    });

    return crossImage;
}

module.exports = createCross;
