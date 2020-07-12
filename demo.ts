import * as Jimp from 'jimp';
import { createGrid, cutCircle } from './index';
const inquirer = require('inquirer');
import { GridParams } from './utils/createGrid'

var questions = [
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
    const canvas = await createGrid({
        ...answers,
        files: [
            { file: 'https://image-manip.s3.us-east-2.amazonaws.com/file-1535079890859.jpg', count: 2 },
            { file: 'https://wow.zamimg.com/images/logos/special/wod/hometitle.png', count: 3 },
            { file: 'https://www.yalasarat.com/wp-content/uploads/2019/12/Wowhead-On-Twitter-Wowhead-On-Twitter-720x931.jpg', count: 1 },
            { file: 'https://wow.zamimg.com/uploads/blog/images/11696-weekly-blizzard-roundup-wowhead-weekly-126-overwatch-and-hearthstone-comics-hero.jpg', count: 2 }
        ]
    });
    canvas.write('./output/canvas.jpg');

    const falco = await Jimp.read('https://image-manip.s3.us-east-2.amazonaws.com/file-1535079890859.jpg')

    falco
        .cover(150, 150)
        .scaleToFit(150, 150)
        .write('./output/falco_covered.png');


    cutCircle(falco)
        .write('./output/falco_circle.png');

}).catch((err: any) => {
    console.log('questionErr', err)
});
