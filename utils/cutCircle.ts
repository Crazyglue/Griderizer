import * as Jimp from 'jimp';

function pythag(a: number, b: number) {
    return Math.round(Math.sqrt(a**2 + b**2));
}

export default function cutCircle(image: Jimp) {
    const { width, height } = image.bitmap;
    console.log('cutCircle -> width', width)
    console.log('cutCircle -> height', height)

    const radius = width / 2;
    console.log('cutCircle -> radius', radius)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const a = x > radius ? x - radius : radius - x;
            const b = y > radius ? y - radius : radius - y;
            if (pythag(a, b) > radius) {
                image.setPixelColor(0x00000000, x, y)
            }
        }
    }

    return image;
}