const inquirer = require('inquirer');
const _ = require('lodash');

async function createFileMap(fileList) {
    const questions = _.map(fileList, (file, index) => {
        return {
            type: 'input',
            name: index.toString(),
            message: `${file} #`,
            validate: function(value) {
              var valid = !isNaN(parseFloat(value));
              return valid || 'Please enter a number';
            },
            filter: Number,
            default: 1
        }
    });

    const answers = await inquirer.prompt(questions);
    console.log('answers', answers);

    return answers;
};

module.exports = createFileMap;
