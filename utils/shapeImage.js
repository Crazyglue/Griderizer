var Jimp = require("jimp");

function shapeImage(image, tileDimensionsPixels) {
    return Jimp.read(`input/${image}`).then(imageFile => {
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
    })
    .catch(err => {
        throw err;
    })
}

module.exports = shapeImage;