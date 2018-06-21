const fs = require('fs');
const _ = require("lodash");
const ppi2px = require('./ppi2px');
const createCross = require('./createCross');
const shapeImage = require('./shapeImage');
const createCanvas = require('./createCanvas');
const createFileMap = require('./createFileMap');

async function createGrid({ columns, rows, ppi, inputFolder, diameterMM, outputFolder }) {
    const files = fs.readdirSync(inputFolder)

    const fileMap = await createFileMap(files);

    const tileDimensionsPixels = ppi2px(ppi, diameterMM);

    const crossImage = createCross(tileDimensionsPixels);
    crossImage.write(`${outputFolder}/cross.jpg`);

    const shapedImages = await Promise.all(
        _.map(files, img => shapeImage(img, tileDimensionsPixels))
    )

    const mappedImages = _.map(shapedImages, (jimpImage, i) => {
        const index = i.toString();
        return { 
            image: jimpImage,
            count: fileMap[index]   
        }
    })

    const canvas = await createCanvas(columns, rows, tileDimensionsPixels.x, tileDimensionsPixels.y, [{ image: crossImage, count: 1 }, ...mappedImages, { image: crossImage, count: 1 }])
    canvas.write(`${outputFolder}/canvas-${new Date().getTime()}.jpg`)
    return canvas
}

module.exports = createGrid;
