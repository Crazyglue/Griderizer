const fs = require('fs');
const _ = require("lodash");
const ppi2px = require('./ppi2px');
const createCross = require('./createCross');
const shapeImage = require('./shapeImage');
const createCanvas = require('./createCanvas');

async function createGrid({ columns, rows, ppi, inputFolder, diameterMM, outputFolder }) {
    const files = fs.readdirSync(inputFolder)
    const tileDimensionsPixels = ppi2px(ppi, diameterMM);

    const crossImage = createCross(tileDimensionsPixels);
    crossImage.write(`${outputFolder}/cross.jpg`);

    Promise.all(_.map(files, img => {
        return shapeImage(img, tileDimensionsPixels).then(shapedImage => shapedImage.write(`${outputFolder}/${img}`))
    }))
    .then(async shapedImages => {
        const canvas = await createCanvas(columns, rows, tileDimensionsPixels.x, tileDimensionsPixels.y, ['cross.jpg', ...files, 'cross.jpg'])
        canvas.write(`${outputFolder}/canvas-final.jpg`)
    });

}

module.exports = createGrid;
