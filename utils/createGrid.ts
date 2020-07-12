import * as _ from 'lodash';
import * as Jimp from 'jimp';
import ppi2px from './ppi2px';
import createCross from './createCross';
import shapeImage from './shapeImage';
import createCanvas from './createCanvas';

interface InputFile {
  file: Buffer;
  count: number;
}

export interface GridParams {
  columns: number;
  rows: number;
  ppi: number;
  files: InputFile[];
  diameterMM: number;
}

export interface ProcessedImage {
  image: any;
  count: number;
}

export default async function createGrid({ columns, rows, ppi, files, diameterMM }: GridParams, coversionType: string = null) {
    const tileDimensionsPixels = ppi2px(ppi, diameterMM);

    const crossImage = await createCross(tileDimensionsPixels);

    const shapedImages: ProcessedImage[] = await Promise.all(
      files.map(async img => {
        const shapedImage = await shapeImage(img.file, tileDimensionsPixels);
        return {
          image: shapedImage,
          count: Number(img.count)
        };
      })
    );

    const canvas = await createCanvas(columns, rows, tileDimensionsPixels.x, tileDimensionsPixels.y, [{ image: crossImage, count: 1 }, ...shapedImages, { image: crossImage, count: 1 }]);
    if (coversionType === 'base64') {
      return await canvas.getBase64Async(Jimp.MIME_JPEG);
    } else {
      return canvas;
    }
}
