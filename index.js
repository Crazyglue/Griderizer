const createGrid = require('./utils/createGrid');

/**
 * @param {Object} params
 * @param {Number} params.columns
 * @param {Number} params.rows
 * @param {Number} params.ppi
 * @param {String} params.inputFolder
 * @param {Number} params.diameterMM
 * @param {String} params.outputFolder
 */
module.exports = (params) => {
    return createGrid(params)
}
