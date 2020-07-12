// const createGrid = require('./built/utils/createGrid').default;
import * as Jimp from 'jimp';
import { createGrid, ppi2px, shapeImage, cutCircle } from './index';
const inquirer = require('inquirer');
import { GridParams } from './utils/createGrid'
// const upload = require('./built/utils/upload');
const fs = require('fs');

var questions = [
    {
        type: 'input',
        name: 'inputFolder',
        message: "Input folder",
        default: 'input'
    },
    {
        type: 'input',
        name: 'outputFolder',
        message: "output folder",
        default: 'output'
    },
    {
        type: 'input',
        name: 'columns',
        message: 'Columns (width)',
        validate: function (value: string) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 7
    },
    {
        type: 'input',
        name: 'rows',
        message: 'Rows (height)',
        validate: function (value: string) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 5
    },
    {
        type: 'input',
        name: 'ppi',
        message: 'PPI',
        validate: function (value: string) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 300
    },
    {
        type: 'input',
        name: 'diameterMM',
        message: 'Jewel Diameter (mm)',
        validate: function (value: string) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 80
    }
];

inquirer.prompt(questions).then(async (answers: GridParams) => {
    // const canvas = await createGrid({
    //     ...answers,
    //     files: [
    //         { file: 'https://image-manip.s3.us-east-2.amazonaws.com/file-1535079890859.jpg', count: 2 },
    //         { file: 'https://wow.zamimg.com/images/logos/special/wod/hometitle.png', count: 3 },
    //         { file: 'https://www.yalasarat.com/wp-content/uploads/2019/12/Wowhead-On-Twitter-Wowhead-On-Twitter-720x931.jpg', count: 1 },
    //         { file: 'https://wow.zamimg.com/uploads/blog/images/11696-weekly-blizzard-roundup-wowhead-weekly-126-overwatch-and-hearthstone-comics-hero.jpg', count: 2 }
    //     ]
    // });
    // console.log('canvas', canvas)
    // canvas.write('./output/canvas.jpg');

    const dimensions = ppi2px(300, 80);

    // const customImage = await shapeImage('https://wow.zamimg.com/images/logos/special/wod/hometitle.png', dimensions)
    // customImage.write('./output/wowhead_shaped.png')

    const coverImage = await Jimp.read('https://wow.zamimg.com/images/logos/special/wod/hometitle.png')
    const falco = await Jimp.read('https://image-manip.s3.us-east-2.amazonaws.com/file-1535079890859.jpg')
    const mask = await Jimp.read('./test_mask.png');
    const size = coverImage.bitmap.width < coverImage.bitmap.height ? coverImage.bitmap.width : coverImage.bitmap.height;
    // coverImage
    //     .cover(1500, 1500)
    //     .scaleToFit(1500, 1500)
    //     .mask(mask, 0, 0)
    //     .write('./output/wowhead_covered.png');
    falco
        .cover(150, 150)
        .scaleToFit(150, 150)
        // .mask(mask, 0, 0)
        .write('./output/falco_covered.png');


    (await cutCircle(falco)).write('./output/falco_circle.png');

    // mask
    //     .cover(1500, 1500)
    //     .scaleToFit(1500, 1500)
    //     .mask(coverImage, 0, 0)
    //     .write('./output/wowhead_covered.png');

}).catch((err: any) => {
    console.log('questionErr', err)
});
