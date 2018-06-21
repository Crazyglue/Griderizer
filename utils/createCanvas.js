var Jimp = require("jimp");
var _ = require('lodash');

async function createCanvas(columns, rows, cellWidth, cellHeight, images) {
    const canvas = new Jimp(columns * cellWidth, rows * cellHeight, Jimp.rgbaToInt(24, 48, 48, 1), (err, newCanvas) => {
        if (err) throw err;
    })

    console.log(images);

    let totalImageCount = 0;

    for(let index = 0; index < images.length; index++) {
        const { count, image } = images[index]
        console.log('----------')

        for(let j = 0; j < count; j++) {
            console.log('index:count', index, ":", j)
            const { width, height } = image.bitmap;

            const canvasY = Math.floor(totalImageCount / (columns))
            const canvasX = totalImageCount % (columns)

            console.log(`cell:  ${canvasX}, ${canvasY}`)

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const color = image.getPixelColor(x, y);
                    canvas.setPixelColor(color, (canvasX * cellWidth) + x, (canvasY * cellHeight) + y);
                }
            }

            totalImageCount++
        }

        console.log(`===== ${index} =====`)
    }
    return canvas
}

module.exports = createCanvas;