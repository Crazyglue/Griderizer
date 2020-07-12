import * as Jimp from 'jimp';
import { TimeDimensions } from './ppi2px';

export default async function shapeImage(buffer: string, tileDimensionsPixels: TimeDimensions) {
    // const trimmedImage = image.replace(/^data:image\/(.+);base64,/, '');
    // const buffer = Buffer.from(trimmedImage, 'base64');
    try {
        const imageFile = await Jimp.read(buffer);
        const clonedImage = imageFile.clone();

        const { width, height } = clonedImage.bitmap;

        const smallestDimension = width < height ? width : height;

        return clonedImage
            .cover(smallestDimension, smallestDimension)
            .scaleToFit(tileDimensionsPixels.x, tileDimensionsPixels.y)
    } catch (err) {
        throw err;
    }
}
