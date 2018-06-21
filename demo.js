const createGrid = require('./utils/createGrid');
const inquirer = require('inquirer');
const AWS = require('aws-sdk');
const Jimp = require('jimp');
const { accessKeyId, secretAccessKey, bucket, server } = require('./config/env');
AWS.config.update({ accessKeyId, secretAccessKey });

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

    const s3 = new AWS.S3( { params: {Bucket: 'image-manip', timeout: 6000000} });

    console.log('s3 created...')

    try {
        console.log('canvas', canvas)
        await canvas.getBuffer(Jimp.MIME_JPEG, (error, buffer) => {
            if (error) {
                console.log('error', error)
            }
            console.log('buffer created...', buffer)

            const key = `canvas-${new Date().getTime()}.jpg`
            console.log('key', key)
            s3.putObject({
                Bucket: bucket,
                Key: key,
                Body: buffer,
                ACL: 'public-read'
            }, function (resp) {
                console.log(arguments);
                console.log('Successfully uploaded package.');
                console.log('link: ', `${server}/${bucket}/${key}`)
            });
        }).catch(err => console.log('err', err))
    } catch(err) {
        console.log('try err', err)
    }

}).catch(err => {
    console.log('questionErr', err)
});
