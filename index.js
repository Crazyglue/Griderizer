var Jimp = require("jimp");
const _ = require("lodash");
const fs = require('fs');
const ppi2px = require('./utils/ppi2px');
const createCross = require('./utils/createCross');
const shapeImage = require('./utils/shapeImage');
const createCanvas = require('./utils/createCanvas');

const files = fs.readdirSync('input')
console.log('inputFiles', files);

async function createGrid(inputFiles) {
    const ppi = 300;
    const tileDimensionsMM = 80;
    const tileDimensionsPixels = ppi2px(ppi, tileDimensionsMM);

    console.log("tileDimensionsPixels", tileDimensionsPixels);

    const crossImage = createCross(tileDimensionsPixels);
    crossImage.write("output/cross.jpg");

    Promise.all(_.map(inputFiles, img => {
        return shapeImage(img, tileDimensionsPixels).then(shapedImage => shapedImage.write(`output/${img}`))
    }))
    .then(async shapedImages => {
        const canvas = await createCanvas(7, 5, tileDimensionsPixels.x, tileDimensionsPixels.y, ['cross.jpg', ...inputFiles, 'cross.jpg'])
        canvas.write('output/canvas-final.jpg')
    });

}

createGrid(files)
