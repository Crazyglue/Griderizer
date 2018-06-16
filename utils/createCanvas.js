var Jimp = require("jimp");
var _ = require('lodash');

async function createCanvas(columns, rows, cellWidth, cellHeight, images) {
    const canvas = new Jimp(columns * cellWidth, rows * cellHeight, Jimp.rgbaToInt(24, 48, 48, 1), (err, newCanvas) => {
        if (err) throw err;
    })

    console.log(images);

    for(let index = 0; index < images.length; index++) {
        const image = images[index]
        console.log('----------')
        console.log('index:', index)
        await Jimp.read(`output/${image}`).then(source => {
            const { width, height } = source.bitmap;

            const canvasY = Math.floor(index / (columns))
            const canvasX = index % (columns)

            console.log(`cell:  ${canvasX}, ${canvasY}`)

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const color = source.getPixelColor(x, y);
                    canvas.setPixelColor(color, (canvasX * cellWidth) + x, (canvasY * cellHeight) + y);
                }
            }
            return canvas
        }).then(source => {
            return Promise.resolve(source);
        })

        console.log(`===== ${index} =====`)
    }
    return canvas
}

module.exports = createCanvas;