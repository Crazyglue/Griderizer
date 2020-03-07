import * as Jimp from 'jimp';
import { TimeDimensions } from './ppi2px';

async function shapeImage(buffer: Buffer, tileDimensionsPixels: TimeDimensions) {
    // const trimmedImage = image.replace(/^data:image\/(.+);base64,/, '');
    // const buffer = Buffer.from(trimmedImage, 'base64');
    try {

        const imageFile = await Jimp.read(buffer);
        const clonedImage = imageFile.clone();

        // crop width/height if needed (to make square)
        if (clonedImage.bitmap.width > clonedImage.bitmap.height) {
            const x = Math.floor((clonedImage.bitmap.width - clonedImage.bitmap.height) / 2);

            clonedImage.crop( x, 0, clonedImage.bitmap.height, clonedImage.bitmap.height );

        } else if (clonedImage.bitmap.width < clonedImage.bitmap.height) {
            const y = Math.floor((clonedImage.bitmap.height - clonedImage.bitmap.width) / 2);

            clonedImage.crop( 0, y, clonedImage.bitmap.width, clonedImage.bitmap.width );
        }

        clonedImage.scaleToFit(tileDimensionsPixels.x, tileDimensionsPixels.x)

        return clonedImage
    } catch (err) {
        throw err;
    }
}

module.exports = shapeImage;