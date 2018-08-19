const createGrid = require('./utils/createGrid');
const inquirer = require('inquirer');
const upload = require('./utils/upload');

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
        validate: function (value) {
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
        validate: function (value) {
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
        validate: function (value) {
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
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 80
    }
];

inquirer.prompt(questions).then(async answers => {
    const canvas = await createGrid(answers);
    upload(canvas);
   
}).catch(err => {
    console.log('questionErr', err)
});
