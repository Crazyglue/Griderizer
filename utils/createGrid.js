const _ = require("lodash");
const Jimp = require("jimp");
const ppi2px = require('./ppi2px');
const createCross = require('./createCross');
const shapeImage = require('./shapeImage');
const createCanvas = require('./createCanvas');

async function createGrid({ columns, rows, ppi, files, diameterMM }, coversionType = null) {
    const tileDimensionsPixels = ppi2px(ppi, diameterMM);

    const crossImage = await createCross(tileDimensionsPixels);

    const shapedImages = await Promise.all(
      _.map(files, async img => {
        const shapedImage = await shapeImage(img.file, tileDimensionsPixels);
        return {
          image: shapedImage,
          count: Number(img.count)
        };
      })
    );

    const canvas = await createCanvas(columns, rows, tileDimensionsPixels.x, tileDimensionsPixels.y, [{ image: crossImage, count: 1 }, ...shapedImages, { image: crossImage, count: 1 }]);
    if (coversionType === 'base64') {
      return await canvas.getBase64Async(Jimp.MIME_JPEG);
    } else {
      return canvas;
    }
}

module.exports = createGrid;
