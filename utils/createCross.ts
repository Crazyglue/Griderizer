import * as Jimp from 'jimp';
import { TimeDimensions } from './ppi2px';

function createCross(tileDimensionsPixels: TimeDimensions) {
  return new Promise((resolve, reject) => {
    new Jimp(tileDimensionsPixels.x, tileDimensionsPixels.y, Jimp.rgbaToInt(200, 200, 200, 1, () => {}), (err, image) => {
        if (err) {
          console.error(err)
          reject(err);
        }
        const crossColor = Jimp.rgbaToInt(0, 0, 0, 1, () => {});
        const halfWidth = Math.floor(tileDimensionsPixels.x / 2)
        const halfHeight = Math.floor(tileDimensionsPixels.y / 2)

        for(var y = 0; y < tileDimensionsPixels.y; y++) {
            let lastX;
            for(var x = 0; x < tileDimensionsPixels.x; x++) {
              // 5px wide line
              if (x < halfWidth + 2 && x > halfWidth - 2) {
                image.setPixelColor(crossColor, x, y);
              } else if (y < halfHeight + 2 && y > halfHeight - 2) {
                image.setPixelColor(crossColor, x, y);
              }
            }
        }

        resolve(image);
    });
  })
}

module.exports = createCross;
