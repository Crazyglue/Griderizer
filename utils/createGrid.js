const _ = require("lodash");
const ppi2px = require('./ppi2px');
const createCross = require('./createCross');
const shapeImage = require('./shapeImage');
const createCanvas = require('./createCanvas');

async function createGrid({ columns, rows, ppi, files, diameterMM }) {
    const tileDimensionsPixels = ppi2px(ppi, diameterMM);

    const crossImage = await createCross(tileDimensionsPixels);

    const shapedImages = await Promise.all(
      _.map(files, async img => {
        return new Promise(async (resolve, reject) => {
          const shapedImage = await shapeImage(img.file, tileDimensionsPixels);
          resolve({
            image: shapedImage,
            count: Number(img.count)
          });
        });
      })
    );

    return await createCanvas(columns, rows, tileDimensionsPixels.x, tileDimensionsPixels.y, [{ image: crossImage, count: 1 }, ...shapedImages, { image: crossImage, count: 1 }]);
}

module.exports = createGrid;
