const createGrid = require('./built/utils/createGrid');
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
    const canvas = await createGrid(answers);
    console.log('canvas', canvas)
    fs.writeFileSync('./demo/canvas.jpg', canvas);
    // upload(canvas);

}).catch((err: any) => {
    console.log('questionErr', err)
});
