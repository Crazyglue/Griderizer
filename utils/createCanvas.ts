import * as Jimp from 'jimp';
import * as _ from 'lodash';
import { ProcessedImage } from './createGrid';

async function createCanvas(columns: number, rows: number, cellWidth: number, cellHeight: number, images: ProcessedImage[]) {
    const canvasPromise: Promise<Jimp> = new Promise(async (resolve, reject) => {
      new Jimp(columns * cellWidth, rows * cellHeight, Jimp.rgbaToInt(24, 48, 48, 1, () => {}), (err, newCanvas) => {
        if (err) {
          console.error('err: ', err);
          reject(err);
        }
        resolve(newCanvas);
      })
    })

    const canvas = await canvasPromise;

    let totalImageCount = 0;

    for(let index = 0; index < images.length; index++) {
        const { count, image } = images[index]

        for(let j = 0; j < count; j++) {
            const { width, height } = image.bitmap;

            const canvasY = Math.floor(totalImageCount / (columns))
            const canvasX = totalImageCount % (columns)


            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const color = image.getPixelColor(x, y);
                    canvas.setPixelColor(color, (canvasX * cellWidth) + x, (canvasY * cellHeight) + y);
                }
            }

            totalImageCount++
        }
    }
    return canvas
}

module.exports = createCanvas;